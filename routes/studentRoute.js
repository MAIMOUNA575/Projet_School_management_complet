import express from "express";
import {lister_Student, recherche_Student, add_Student, update_Student, delete_Student} from '../controler/studentControler.js'


const router = express.Router();



router.get('/',lister_Student);

router.get('/:matricule',recherche_Student);

router.post('/',add_Student);

router.put('/:matricule',update_Student);

router.delete('/:matricule',delete_Student);

export default router;