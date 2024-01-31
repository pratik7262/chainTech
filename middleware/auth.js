import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("auth-token");
    if (!token) {
      res.status(500).json({ message: "Access Denied" });
    }

    if (token.startsWith("ecmr ")) {
      token = token.slice(5, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRETE);
    req.user = verified;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
