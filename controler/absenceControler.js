import {addAbsence,marquerAbsence,listerAbsences, consulerAbsences} from "../services/absenceService.js";

function add_Absence(req, res) {
    const { student_id, date, status } = req.body;

    const absence = addAbsence(student_id, date, status);

    if (!absence) {
        return res.status(400).json({
            message: "Impossible d'ajouter l'absence."
        });
    }

    res.status(201).json({
        message: "Absence ajoutée avec succès",
        id: absence
    });
}

function lister_Absences(req, res) {
    const absences = listerAbsences();

    res.json(absences);
}

function update_Absence(req, res) {

    const { status } = req.body;

    const absence = marquerAbsence(req.params.id, req.body.status);

    if (!absence) {
        return res.status(404).json({
            message: "Absence non trouvée"
        });
    }

    res.json({
        message: "Absence mise à jour"
    });
}


function consuler_Absences(req,res){
    const absences = consulerAbsences(req.params.student_id);
    if(!absences){
        return res.status(404).json({
            message:'Absence NON trouver'
        })
    }
    res.json(absences);
}


export {add_Absence, update_Absence, consuler_Absences,lister_Absences};
