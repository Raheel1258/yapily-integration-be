import { Router } from "express";
import { getAllLinkedAccounts, getLinkedAccountById } from "./linked-accounts.service.js";

const router = Router();

router.get("/accounts", async (req, res, next) => {
  try {
    const accounts = await getAllLinkedAccounts(req.headers["consent"]);
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/accounts/:id", async (req, res, next) => {
  try {
    const accounts = await getLinkedAccountById(req.params.id, req.headers["consent"]);
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

export default router;
