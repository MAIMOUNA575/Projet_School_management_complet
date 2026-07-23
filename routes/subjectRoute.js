import express from 'express';
import {lister_Suject, recherche_Subject, add_Subject, add_Subject_id, update_Subject, delete_Subject} from '../controler/subjectControler.js'

const router = express.Router();



router.get('/',lister_Suject);

router.get('/:id',recherche_Subject);

router.post('/',add_Subject);

router.post('/:id',add_Subject_id)

router.put('/:id',update_Subject)

router.delete('/:id',delete_Subject)

export default router;