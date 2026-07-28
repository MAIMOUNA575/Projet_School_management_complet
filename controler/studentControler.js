import { addStudent, updateStudent, deleteStudent, rechercheStudent, listerStudents } from "../services/studentService.js";


function lister_Student(req, res) {
    res.json(listerStudents());
}

function recherche_Student(req, res) {
    const student = rechercheStudent(req.params.matricule);
    if (!student) {
        return res.status(404).json({
            message: 'Etudiant introuvable'
        })
    }
    res.json(student)
}

function add_Student(req, res) {
    const { matricule, nom, prenom, age, classe, users_id } = req.body;

    const student = addStudent(
        matricule,
        nom,
        prenom,
        age,
        classe,
        users_id
    );
    res.status(201).json(student);
}


function update_Student(req, res) {
    const { nom, prenom, age, classe, users_id } = req.body;

    const student = updateStudent(
        req.params.matricule,
        nom,
        prenom,
        age,
        classe,
        users_id
    );

    if (!student) {
        return res.status(404).json({
            message: "Etudiant non trouvé"
        });
    }

    res.json(student);
}

function delete_Student(req, res) {
    const student = deleteStudent(req.params.matricule);
    if (!student) {
        return res.status(404).json({
            message: 'Etudiant non trouve'
        })
    }
    res.json({
        message: "Etudiant supprimé avec succès"
    });
}

export { lister_Student, recherche_Student, add_Student, update_Student, delete_Student }
