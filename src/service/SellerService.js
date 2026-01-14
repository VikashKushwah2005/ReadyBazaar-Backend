const Seller = require('../modal/Seller');
const jwtProvider = require('../util/jwtProvider');
const Address = require('../modal/Address');

class SellerService {
   
    async createSeller(sellerData){
        const existingSeller = await Seller.findOne({email:sellerData.email});
        if(existingSeller){
            throw new Error("Seller with this email already exists");
        }
        let saveAddress = sellerData.pickupAddress;
        saveAddress = await Address.create(sellerData.pickupAddress);

        const newSeller = new Seller({
            sellerName:sellerData.sellerName,
            email:sellerData.email,
            password:sellerData.password,
            pickupAddress:saveAddress._id,
            GSTIN:sellerData.GSTIN,
            mobile:sellerData.mobile,
            businessDetails:sellerData.businessDetails,
            bankDetails:sellerData.bankDetails
        })

        return await newSeller.save();    
    }
    async getSellerProfile(jwt){
        const email = jwtProvider.getEmailFromjwt(jwt);
        return this.getSellerByEmail(email);
    }

    async getSellerByEmail(email){
        const seller = await Seller.findOne({email});
        if(!seller){
            throw new Error("Seller not found");
        }

        return seller;
    }
    
    async getSellerById(id){
        const seller = await Seller.findById(id);
        if(!seller){
            throw new Error("Seller not found");
        }
        return seller;
    }

    async getAllSellers(status){
        return await Seller.find({accountStatus:status});
    }

    async updateSeller(exitsingSeller,sellerData){
         return await Seller.findByIdAndUpdate(exitsingSeller._id,sellerData,{
            new:true
        });
    }

    async updateSellerStatus(sellerId,status){
        return await Seller.findByIdAndUpdate(sellerId,{accountStatus:status},{
            new:true
        });
    }
}

module.exports = new SellerService();
        