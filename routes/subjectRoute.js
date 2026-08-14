import { verifierSubject } from "../middleWare/subjectWare.js";
import express from 'express';
import {lister_Subject, recherche_Subject, add_Subject, update_Subject, delete_Subject} from '../controler/subjectControler.js'

const router = express.Router();



router.get('/',lister_Subject);

router.get('/:id',recherche_Subject);

router.post('/',add_Subject);

router.put('/:id',update_Subject)

router.delete('/:id',delete_Subject)

export default router;