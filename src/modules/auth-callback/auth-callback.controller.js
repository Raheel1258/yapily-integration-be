import { Router } from "express";

const router = Router();

router.get("/yapily/auth", async (req, res, next) => {
  const consent = req.query.consent;
  const userUuid = req.query["user-uuid"];
  const institution = req.query.institution;
  res.status(200).json("Consent received");
});

export default router;
