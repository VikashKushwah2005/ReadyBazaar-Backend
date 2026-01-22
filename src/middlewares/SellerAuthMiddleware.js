const SellerService =require('../service/SellerService');
const jwtProvider = require("../util/jwtProvider");

const sellerAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    const email = jwtProvider.getEmailFromjwt(token);
    if (!email) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const seller = await SellerService.getSellerByEmail(email);
    if (!seller) {
      return res.status(401).json({ message: "Seller not found" });
    }

    req.seller = seller;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = sellerAuthMiddleware;