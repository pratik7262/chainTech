import express from "express";
import { getUser, signIn, signUp } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";
import { signInRules, signUpRules } from "../utils/routerUtils.js";

const router = express.Router();

//Sign Up Endpoint
router.post("/register", signUpRules, signUp);

router.post("/login", signInRules, signIn);

router.get("/getuser", verifyToken, getUser);

export default router;
