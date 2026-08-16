import { verifierTeacher } from "../middleWare/teacherWare.js";
import express from "express";
import { liste_Teacher, recherche_Teacher, add_Teacher, update_Teacher, delete_Teacher} from "../controler/teacherControler.js";

const router = express.Router();

router.get("/", liste_Teacher);

router.get("/:id", recherche_Teacher);

router.post("/", add_Teacher);

router.put("/:id", update_Teacher);

router.delete("/:id", delete_Teacher);

export default router;