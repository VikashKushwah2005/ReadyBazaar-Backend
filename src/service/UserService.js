const User = require("../modal/User");
const jwtProvider = require("../util/jwtProvider");

class UserService{

    async findUserProfileByJwt(token){
        
        const email = jwtProvider.getEmailFromJwt(token);   
        const user = await User.findOne({email});  

        if(!user){
            throw new Error("User not found");
        }   
        return user;
    }

    async findUserByEmail(email){
        const user = await User.findOne({email});  
        if(!user){
            throw new Error("User not found");
        }   
        return user;
    }
}
module.exports = new UserService();