import { Router } from "express";
import {
  getAllLinkedAccounts,
  getLinkedAccountById,
} from "./linked-accounts.service.js";
import { auth } from "../auth/auth.js";

const router = Router();

router.get("/accounts", auth.required, async (req, res, next) => {
  try {
    const accounts = await getAllLinkedAccounts(req?.auth?.user?.id);
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/accounts/:id", auth.required, async (req, res, next) => {
  try {
    const accounts = await getLinkedAccountById(req.params.id);
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

export default router;
