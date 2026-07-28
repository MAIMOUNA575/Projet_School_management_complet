import express from 'express';
import {identifier_meilleur_Etudiant,moyenne_general,moyenne_Etudiant,compter_absence,statistique_Etudiant,moyenne_par_Matiere} from "../controler/gradeControler.js";



const router = express.Router();


router.get('/meilleur', identifier_meilleur_Etudiant);

router.get('/moyenne-generale', moyenne_general);

router.get('/etudiant/:id/moyenne', moyenne_Etudiant);

router.get('/etudiant/:id/absences', compter_absence);

router.get('/etudiant/:id/matieres', moyenne_par_Matiere);

router.get('/etudiant/:id/statistiques', statistique_Etudiant);

export default router;