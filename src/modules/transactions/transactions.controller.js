import { Router } from "express";
import { getTransactionByAccountId } from "./transactions.service.js";
import { auth } from "../auth/auth.js";

const router = Router();

router.get(
  "/accounts/:id/transactions",
  auth.required,
  async (req, res, next) => {
    try {
      const transactions = await getTransactionByAccountId(req.params.id);
      res.status(200).json(transactions);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
