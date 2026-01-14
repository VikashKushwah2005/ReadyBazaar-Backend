const VerificationCode = require("../modal/VerificationCode");
const generateOTP = require("../util/GenerateOtp");
const sendVerificationEmail = require("../util/SendEmail");
const User = require("../modal/User");
const bcrypt = require("bcrypt");
const Cart = require("../modal/Cart");
const jwtProvider = require("../util/jwtProvider");
const UserRoles = require("../domain/UserRole");
const Seller = require("../modal/Seller");


class AuthService{
    
    async sendLoginOTP(email){

        const SIGNIN_PREFIX = "signin_";
        if(email.startsWith(SIGNIN_PREFIX)){
            email = email.substring(SIGNIN_PREFIX.length);
            const seller = await Seller.findOne({email});
            const user = await User.findOne({email});
            if(!seller && !user){        


             throw new Error("User not found");
           }
        }
        

        const existingVerificationCode = await VerificationCode.findOne({email});
        if(existingVerificationCode){
            await VerificationCode.deleteOne({email});
        }
        //opt generation logic
        const otp = generateOTP();
        const verificationCode = new VerificationCode({
            otp,
            email
        });
        await verificationCode.save();

        //send otp to email logic here

        const subject = "Ready Bazaar Login/Signup OTP";
        const body = `<p>Your OTP is: <b>${otp}</b></p>`;

        await sendVerificationEmail(email, subject, body);

    }
     
    async createUser(req){
        const{email,fullName,otp} = req;
        let user = await User.findOne({email});

        if(user){
            throw new Error("User with this email already exists");
        }
        user = new User({
            email,fullName
        });
        await user.save();

        const cart = new Cart({
            user:user._id
        });
        await cart.save();

        return jwtProvider.createJwt({email});
    }

    async signin(req){
        const{email,otp} = req.body
        
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User not found");
        }   
        const verificationCode = await VerificationCode.findOne({email});
        if(!verificationCode || verificationCode.otp !== otp){
            throw new Error("Invalid OTP");
        }   

        return {
            message:"Login successful",
            token:jwtProvider.createJwt({email}),
            role:UserRoles.CUSTOMER
        }
    }

}
module.exports = new AuthService();

