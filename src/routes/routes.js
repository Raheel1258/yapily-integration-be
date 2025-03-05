import { Router } from "express";
import authController from "../modules/auth/auth.controller.js";
import institutionsController from "../modules/institutions/institutions.controller.js";
import accountsController from "../modules/linked-accounts/linked-accounts.controller.js";
import callbackController from "../modules/auth-callback/auth-callback.controller.js";

const api = Router();

api.use(authController);

api.use(institutionsController);

api.use(accountsController);

const router = Router();
router.use(callbackController);
router.use("/api/v1", api);

export default router;
