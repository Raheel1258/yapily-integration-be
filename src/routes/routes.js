import { Router } from "express";
import authController from "../modules/auth/auth.controller.js";
import institutionsController from "../modules/institutions/institutions.controller.js";

const api = Router();

api.use(authController);

api.use(institutionsController);

export default Router().use("/api/v1", api);
