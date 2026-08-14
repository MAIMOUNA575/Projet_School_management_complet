import { verifierGrade } from "../middleWare/gradeWare.js";
import express from 'express';
import {lister_Grade, recherche_Grade, add_Grade, update_Grade, delete_Grade} from "../controler/gradeControler.js";



const router = express.Router();

router.get('/', lister_Grade);

router.get('/:id', recherche_Grade);

router.post('/', add_Grade);

router.put('/:id', update_Grade);

router.delete('/:id', delete_Grade);


export default router;