import express from "express";
import {
  register,
  login,
  refreshAccessToken,
} from "../Controllers/auth.controller.js";
import { сheckRegField } from "../Controllers/auth.prepare.js";

const authRouter = express.Router();

authRouter.post("/register", сheckRegField, register);
authRouter.get("/login", login);
authRouter.post("/refresh", refreshAccessToken);
export default authRouter;
