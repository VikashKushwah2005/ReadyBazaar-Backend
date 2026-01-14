const sellerService = require("../service/SellerService");
const VerificationCode = require("../modal/VerificationCode");
const jwtProvider = require("../util/jwtProvider");
const UserRoles = require("../domain/UserRole");

class SellerController{
    async getSellerProfile(req,res){
        console.log(req.seller);
        try{
            const seller = req.seller;
            
            //bearer token
            res.status(200).json(seller);
        }catch(error){
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
        }
    }
    async createSeller(req,res){
        try{
            
            const seller = await sellerService.createSeller(req.body);

            res.status(200).json({message:"Seller created successfully"});
        }catch(error){
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
        }
    }
    async getAllSellers(req,res){
        try{
            
            const sellers = await sellerService.getAllSellers(req.query.status);

            res.status(200).json(sellers);
        }catch(error){
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
        }
    }

    async updateSeller(req,res){
        try{
            const existingSeller = await req.seller;
            const seller = await sellerService.updateSeller(existingSeller, req.body);

            res.status(200).json(seller);
        }catch(error){
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
        }
    }

    async deleteSeller(req,res){
        try{
             await sellerService.deleteSeller(req.params.id);

            res.status(200).json({message:"Seller deleted successfully"});
        }catch(error){
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
        }
    }

    async updateSellerAccountStatus(req,res){
        try{
           const updateSeller = await sellerService.updateSellerStatus(
            req.params.id, req.body.status
          );
            res.status(200).json(updateSeller);
        }
        catch(error){
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
        }
    }

    async verifyLoginOtp(req,res){
        try{
            const { otp, email } = req.body;
            const seller = await sellerService.getSellerByEmail(email);

            const verificationCode = await VerificationCode.findOne({ email });
            if (!seller || verificationCode.otp !== otp) {
                throw new Error("Invalid OTP");
            }
            
            const token = jwtProvider.createJwt({email });
            const authResponse = {
                message: "Login successful",
                token: token,
                role:UserRoles.SELLER
            }
            res.status(200).json(authResponse);
        }catch(error){
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
        }
    }
}

module.exports = new SellerController();