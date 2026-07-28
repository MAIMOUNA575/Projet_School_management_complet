import {addTeacher, updateTeacher, deleteTeacher, rechercheTeacher, listerTeachers} from "../services/teacherService.js";


function liste_Teacher (req,res){
    res.json(listerTeachers());
}

function recherche_Teacher (req,res){
    const teacher = rechercheTeacher(req.params.id);
    if (!teacher) {
        return res.status(404).json({
            message: "Enseignant introuvable"
        });
    }
    res.json(teacher);
}

function add_Teacher(req, res) {
    const { name, matiere, users_id } = req.body;

    const teacher = addTeacher(name, matiere, users_id);

    res.status(201).json(teacher);
}

function update_Teacher(req, res) {
    const { name, matiere, users_id } = req.body;

    const teacher = updateTeacher(
        req.params.id,
        name,
        matiere,
        users_id
    );

    if (!teacher) {
        return res.status(404).json({
            message: "Enseignant non trouvé"
        });
    }

    res.json({
        message: "Enseignant modifié avec succès"
    });
}

function delete_Teacher(req,res){
    const teacher = deleteTeacher(req.params.id);
    if(!teacher){
        return res.status(404).json({
            message : 'Professeur non trouve'
        })
    }
    res.json(teacher)
}

export {liste_Teacher, recherche_Teacher, add_Teacher, update_Teacher, delete_Teacher}
