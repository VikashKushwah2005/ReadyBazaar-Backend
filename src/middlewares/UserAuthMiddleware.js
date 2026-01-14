const jwtProvider = require("../util/jwtProvider");
const UserService = require("../service/UserService");

const userAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    const email = jwtProvider.getEmailFromjwt(token); // may throw

    const user = await UserService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    return next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = userAuthMiddleware;
