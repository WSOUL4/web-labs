import express from "express";
import { apiKeyValidation } from "../Controllers/apiKey.check.js";
import {
  changeById,
  create,
  deleteById,
  getAll,
  getBetween,
  getById,
  getByMy,
} from "../Controllers/event.controller.js";
import { checkRequiredField } from "../Controllers/event.prepare.js";
import { passport, strategy } from "../Configs/passport.js";

const router = express.Router();

router.get("/id", apiKeyValidation, getById);
router.get("/dates", apiKeyValidation, getBetween);
router.get("/", apiKeyValidation, getAll);

router.use(passport.authenticate(strategy, { session: false }));
router.delete("/id", apiKeyValidation, deleteById);
router.put("/id", apiKeyValidation, changeById);
router.post("/", apiKeyValidation, create);
router.get("/my", getByMy);
export default router;
