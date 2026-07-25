import express from 'express';
import {identifier_meilleur_Etudiant,moyenne_general,moyenne_Etudiant,compter_absence,statistique_Etudiant,moyenne_par_Matiere} from "../controler/gradeControler.js";



const router = express.Router();

router.get('/', identifier_meilleur_Etudiant);

router.get('/:id', moyenne_general);

router.post('/', moyenne_Etudiant);

router.put('/:id', compter_absence);

router.put('/:id', moyenne_par_Matiere);

router.delete('/:id', statistique_Etudiant);


export default router;