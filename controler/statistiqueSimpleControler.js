import { identifierMeilleurEtudiant, moyenneGenerale, moyenneEtudiant, compterAbsences, statistiquesEtudiant, moyennesParMatiere } from '../services/gradeService.js';


function identifier_meilleur_Etudiant(req, res) {
    const meilleur = identifierMeilleurEtudiant();
    res.json(meilleur);
}


function moyenne_general(req, res) {
    const mGeneral = moyenneGenerale();

    if (mGeneral === null) {
        return res.status(404).json({
            message: "Aucune note trouve"
        });
    }

    res.json({
        moyenneGenerale: mGeneral
    });
}


function moyenne_Etudiant(req, res) {

    const mEtudiant = moyenneEtudiant(req.params.id);

    if (mEtudiant === null) {
        return res.status(404).json({
            message: "Étudiant introuvable ou aucune note"
        });
    }

    res.json({
        moyenne: mEtudiant
    });
}


function compter_absence(req, res) {

    const cAbsence = compterAbsences(req.params.id);

    if (cAbsence === null) {
        return res.status(404).json({
            message: "Étudiant introuvable"
        });
    }

    res.json(cAbsence);
}


function statistique_Etudiant(req, res) {

    const statistique = statistiquesEtudiant(req.params.id);

    if (!statistique) {
        return res.status(404).json({
            message: "Étudiant introuvable"
        });
    }

    res.json(statistique);
}

function moyenne_par_Matiere(req, res) {

    const mMoyenne = moyennesParMatiere(req.params.id);

    if (mMoyenne.length === 0) {
        return res.status(404).json({
            message: "Aucune moyenne trouvée"
        });
    }

    res.json(mMoyenne);
}


export {identifier_meilleur_Etudiant,moyenne_general,moyenne_Etudiant,compter_absence,statistique_Etudiant,moyenne_par_Matiere};