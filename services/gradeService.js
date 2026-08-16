import Grades from "../model/gradeModel.js";
import db from "../db/database.js";


// ajouter une note (entre 0 et 20)
function addGrades(student_id, subject_id, note) {
    if (!student_id || !subject_id || note < 0 || note > 20) {
        console.error("La note doit être comprise entre 0 et 20.");
        return false;
    }

    const result = db.prepare(`
        INSERT INTO grades (student_id, subject_id, note)
        VALUES (?, ?, ?)
    `).run(student_id, subject_id, note);

    return result.lastInsertRowid;
}

// modifier une note
function updateGrades(id, note) {

    if (note < 0 || note > 20) {
        console.error("La note doit être comprise entre 0 et 20.");
        return false;
    }

    const result = db.prepare(`
        UPDATE grades
        SET note = ?
        WHERE id = ?
    `).run(note, id);

    return result.changes > 0;
}

// supprimer une note
function deleteGrades(id) {
    const result = db.prepare(`
        DELETE FROM grades
        WHERE id = ?
    `).run(id);

    return result.changes > 0;
}

// calculer la moyenne d'un étudiant
function calculeGrade(student_id) {
    const rows = db.prepare(`SELECT note FROM grades WHERE student_id = ?`)
        .all(student_id);

    if (rows.length === 0) return 0;

    const sum = rows.reduce((acc, row) => acc + row.note, 0);
    return sum / rows.length;
}

// lister les notes des etudiants
function listerNotesEtudiant(student_id) {
    if (!student_id) {
        console.error('L\'identifiant de l\'étudiant est obligatoire.');
        return [];
    }

    return db.prepare(`SELECT grades.id, subjects.nom AS matiere, grades.note FROM grades JOIN subjects ON grades.subject_id = subjects.id WHERE grades.student_id = ? `)
    .all(student_id);
}

// rechercher une note
function rechercheGrade(id) {
    return db.prepare(`
        SELECT *
        FROM grades
        WHERE id = ?
    `).get(id);
}

// lister toutes les notes
function listerGrades() {
    return db.prepare(`
        SELECT * FROM grades
    `).all();
}

export {addGrades,updateGrades,deleteGrades,rechercheGrade,listerGrades,calculeGrade,listerNotesEtudiant};
