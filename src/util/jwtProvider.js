const jwt = require("jsonwebtoken");

const SECRET_KEY ="wadfkjnbsmnmnshknsafismnnmdsnvsdjioeiqfanvmkjhwremsnqpmmxxsfyyyxammxmxcmxcmxczcxoadjskdsjb";

class JwtProvider {
   constructor(SECRET_KEY) {
        this.secretKey = SECRET_KEY;
   }

   createJwt(payload){
        return jwt.sign(payload, this.secretKey, { expiresIn: '24h' });
   }
   getEmailFromjwt(token){
       try{
         const decoded = jwt.verify(token, this.secretKey); 
            return decoded.email;   
       }catch(err){
            throw new Error("Invalid token");
       }
   }
   verifyJwt(token){
       try{
         return jwt.verify(token, this.secretKey); 
        
       }catch(err){
            throw new Error("Invalid token");
       }
}
}
module.exports = new JwtProvider(SECRET_KEY);