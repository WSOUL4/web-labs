import express from "express";
import { getAll, add } from "../Controllers/user.controller.js";
import { apiKeyValidation } from "../Controllers/apiKey.check.js";

const usersRouter = express.Router();
usersRouter.get("", apiKeyValidation, getAll);
usersRouter.post("/", apiKeyValidation, add); //usersRouter.post('/users/:name/:email/:createdAt/:id', Add);
export default usersRouter;
