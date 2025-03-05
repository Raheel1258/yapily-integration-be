import { Router } from "express";
import { getInstitutionById, getInstitutions } from "./institutions.service.js";
import { auth } from "../auth/auth.js";

const router = Router();

router.get("/institutions", auth.required, async (req, res, next) => {
  try {
    const institutions = await getInstitutions();
    res.status(200).json(institutions);
  } catch (err) {
    next(err);
  }
});

router.get("/institutions/:id", auth.required, async (req, res, next) => {
  try {
    const institution = await getInstitutionById(req.params.id);
    res.status(200).json(institution);
  } catch (err) {
    next(err);
  }
});

export default router;
