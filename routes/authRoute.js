import express from "express";
import { login, me } from "../controler/authControler.js";

const router = express.Router();


router.post("/login", login);

router.get("/me", authWare, me);

export default router;