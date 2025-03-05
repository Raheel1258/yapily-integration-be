import { Router } from "express";
import { saveFinancialData } from "./auth-callback.service.js";

const router = Router();

router.get("/yapily/auth", async (req, res, next) => {
  try {
    await saveFinancialData(req.query.consent);
    res.status(200).json("Consent received");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
