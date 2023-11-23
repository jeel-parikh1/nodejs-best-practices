import express from "express"
import controller from "./controller.js";
import authMiddleware from "../../../middlewares/auth.js";

const route = express.Router()

route.get("/", authMiddleware, controller.getUsers);
route.post("/", controller.addUser);
route.get("/me", authMiddleware, controller.getUserMe);
route.put("/me", authMiddleware, controller.updateUserMe);
route.get("/:id", authMiddleware, controller.getUserById);
route.delete("/:id", authMiddleware, controller.deleteUser);
route.put("/:id", authMiddleware, controller.updateUser);

export default route;
