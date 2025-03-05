import { Router } from "express";
import { saveFinancialData } from "./auth-callback.service.js";

const router = Router();

router.get("/yapily/auth", async (req, res, next) => {
  try {
    const consent = req.query.consent;
    const userUuid = req.query["user-uuid"];
    await saveFinancialData(userUuid, consent);
    res.status(200).json("Consent received");
  } catch (err) {
    console.log(err)
    next(err);
  }
});

export default router;
