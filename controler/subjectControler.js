import { addSubject, updateSubject, deleteSubject, rechercheSubject, listerSubjects } from '../services/subjectService.js';


function lister_Subject(req, res) {
    res.json(listerSubjects());
}

function recherche_Subject(req, res) {
    const subject = rechercheSubject(req.params.id);
    if (!subject) {
        return res.status(404).json({
            message: "Matière introuvable"
        });
    }
    res.json(subject);
}
function add_Subject(req, res) {
    const { nom, teacher_id } = req.body;

    const subject = addSubject(nom, teacher_id);

    res.status(201).json(subject);
}


function update_Subject(req, res) {

    const { nom } = req.body;

    const subject = updateSubject(req.params.id, nom);

    if (!subject) {
        return res.status(404).json({
            message: "Matière non trouvée"
        });
    }

    res.json(subject);
}

function delete_Subject(req, res) {
    const subject = deleteSubject(req.params.id);
    if (!subject) {
        return res.status(404).json({
            message: 'Matière non trouvée'
        })
    }
    res.json({
        message: "Matière supprimée avec succès"
    });
}

export { lister_Subject, recherche_Subject, add_Subject, update_Subject, delete_Subject }
