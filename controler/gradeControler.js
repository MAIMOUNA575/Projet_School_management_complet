import { addGrades,updateGrades,deleteGrades,rechercheGrade,listerGrades,calculeGrade,listerNotesEtudiant } from '../services/gradeService.js';


function lister_Grade(req, res) {
    const grades = listerGrades();
    res.json(grades);
}


function recherche_Grade(req, res) {
    const grade = rechercheGrade(req.params.id);

    if (!grade) {
        return res.status(404).json({
            message: "Note introuvable"
        });
    }

    res.json(grade);
}


function add_Grade(req, res) {

    const { student_id, subject_id, note } = req.body;

    const grade = addGrades(student_id, subject_id, note);

    if (!grade) {
        return res.status(400).json({
            message: "Impossible d'ajouter la note"
        });
    }

    res.status(201).json({
        message: "Note ajoutée avec succès",
        id: grade
    });
}


function update_Grade(req, res) {

    const { note } = req.body;

    const grade = updateGrades(req.params.id, note);

    if (!grade) {
        return res.status(404).json({
            message: "Note introuvable"
        });
    }

    res.json({
        message: "Note modifiée avec succès"
    });
}


function delete_Grade(req, res) {

    const grade = deleteGrades(req.params.id);

    if (!grade) {
        return res.status(404).json({
            message: "Note introuvable"
        });
    }

    res.json({
        message: "Note supprimée avec succès"
    });
}


export {lister_Grade,recherche_Grade,add_Grade,update_Grade,delete_Grade};