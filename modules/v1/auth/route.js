import express from "express"
import controller from "./controller.js";

const route = express.Router()

route.post("/login", controller.login);
route.post("/logout", controller.logout);

export default route;