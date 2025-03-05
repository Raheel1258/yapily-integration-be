import { Router } from "express";
import { getAccountById, getAllAccounts } from "./linked-accounts.service.js";

const router = Router();

router.get("/accounts", async (req, res, next) => {
  try {
    const accounts = await getAllAccounts(req.headers["consent"]);
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/accounts/:id", async (req, res, next) => {
  try {
    const accounts = await getAccountById(req.params.id, req.headers["consent"]);
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

export default router;
