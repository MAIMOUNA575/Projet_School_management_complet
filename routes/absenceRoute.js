import express from "express";
import { add_Absence, update_Absence, consuler_Absences } from "../controler/absenceControler.js";

const router = express.Router();


router.get('/:student_id',consuler_Absences);

router.post('/',add_Absence);

router.put('/:id',update_Absence);


export default router;