import express from "express"
import controller from "./controller.js";
import authMiddleware from "../../../middlewares/auth.js";
import validator from "../../../middlewares/validator.js";
import { validatorType } from "../../../constants/constants.js";

const route = express.Router()

route.get("/", authMiddleware, controller.getUsers);
route.post("/", validator(validatorType.CREATE_USER), controller.addUser);
route.get("/me", authMiddleware, controller.getUserMe);
route.put("/me", authMiddleware, validator(validatorType.UPDATE_USER), controller.updateUserMe);
route.get("/:id", authMiddleware, controller.getUserById);
route.delete("/:id", authMiddleware, controller.deleteUser);
route.put("/:id", authMiddleware, validator(validatorType.UPDATE_USER), controller.updateUser);

export default route;