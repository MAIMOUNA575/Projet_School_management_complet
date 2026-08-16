import { auth } from "../middleWare/authWare.js";
import express from "express";
import { login, me } from "../controler/authControler.js";

const router = express.Router();


router.post("/login", login);

router.get("/me", auth, me);

export default router;