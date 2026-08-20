import { addGrades,updateGrades,deleteGrades,rechercheGrade,listerGrades,calculeGrade,listerNotesEtudiant } from '../services/gradeService.js';


import {
    identifierMeilleurEtudiant,
    moyenneGenerale,
    moyenneEtudiant,
    compterAbsences,
    statistiquesEtudiant,
    moyennesParMatiere
} from "../services/statistiqueSimpleService.js";


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


// Meilleur étudiant
function identifier_meilleur_Etudiant(req, res) {
    const etudiant = identifierMeilleurEtudiant();

    if (!etudiant) {
        return res.status(404).json({
            message: "Aucun meilleur étudiant trouvé"
        });
    }

    res.json(etudiant);
}


// Moyenne générale
function moyenne_general(req, res) {
    const moyenne = moyenneGenerale();

    if (moyenne === null) {
        return res.status(404).json({
            message: "Aucune note trouvée"
        });
    }

    res.json({
        moyenne_generale: moyenne
    });
}


// Moyenne d'un étudiant
function moyenne_Etudiant(req, res) {
    const moyenne = moyenneEtudiant(req.params.id);

    if (moyenne === null) {
        return res.status(404).json({
            message: "Moyenne introuvable"
        });
    }

    res.json({
        moyenne
    });
}


// Absences d'un étudiant
function compter_absence(req, res) {
    const absences = compterAbsences(req.params.id);

    if (absences === null) {
        return res.status(404).json({
            message: "Étudiant introuvable"
        });
    }

    res.json(absences);
}


// Statistiques d'un étudiant
function statistique_Etudiant(req, res) {
    const statistiques = statistiquesEtudiant(req.params.id);

    if (!statistiques) {
        return res.status(404).json({
            message: "Étudiant introuvable"
        });
    }

    res.json(statistiques);
}


// Moyennes par matière
function moyenne_par_Matiere(req, res) {
    const moyennes = moyennesParMatiere(req.params.id);

    res.json(moyennes);
}
export {
    lister_Grade,
    recherche_Grade,
    add_Grade,
    update_Grade,
    delete_Grade,
    identifier_meilleur_Etudiant,
    moyenne_general,
    moyenne_Etudiant,
    compter_absence,
    statistique_Etudiant,
    moyenne_par_Matiere
};