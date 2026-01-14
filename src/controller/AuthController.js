
const AuthService = require("../service/AuthService");
const UserRoles = require("../domain/UserRole");

class AuthController{

    async sendLoginOtp(req,res){
         try{
           const email = req.body.email;
           await AuthService.sendLoginOTP(email);
           res.status(200).json({message:"OTP sent successfully"});
         }catch(error){
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
         }
    }

    async createUser(req,res){
         try{
           const token =  await AuthService.createUser(req.body);
           const authRes={
            
            message:"User created successfully",
            token:token,
            role:UserRoles.CUSTOMER
           }
           res.status(200).json(authRes); 
         }catch(error){
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
         }
    }

    async signin(req,res){
         try{
           const authRes =  await AuthService.signin(req);
           
           res.status(200).json(authRes); 
         }catch(error){
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
         }
    }
    
}
module.exports = new AuthController();