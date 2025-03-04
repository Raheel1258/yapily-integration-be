import { Router } from "express";
import { createUser, getCurrentUser, loginUser } from "./auth.service.js";

const router = Router();

router.post("/users", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await createUser(email, password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

export default router;
