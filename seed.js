import "./db/tables.js";
import db from "./db/database.js";


const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (name, role, email, password)
    VALUES (?, ?, ?, ?)
`);

insertUser.run(
    "Mouna",
    "admin",
    "mouna@gmail.com",
    "mouna123"
);

insertUser.run(
    "Super Admin",
    "admin",
    "admin2@gmail.com",
    "admin456"
);

insertUser.run(
    "Keline",
    "teacher",
    "keline@gmail.com",
    "keline123"
);

insertUser.run(
    "Awa",
    "teacher",
    "awa@gmail.com",
    "awa123"
);

insertUser.run(
    "Noura",
    "student",
    "noura@gmail.com",
    "noura123"
);

insertUser.run(
    "Amadou",
    "student",
    "amadou@gmail.com",
    "amadou123"
);


const keline = db.prepare(`
    SELECT id FROM users WHERE email = ?
`).get("keline@gmail.com");

const awa = db.prepare(`
    SELECT id FROM users WHERE email = ?
`).get("awa@gmail.com");

const noura = db.prepare(`
    SELECT id FROM users WHERE email = ?
`).get("noura@gmail.com");

const amadou = db.prepare(`
    SELECT id FROM users WHERE email = ?
`).get("amadou@gmail.com");

const insertStudent = db.prepare(`
    INSERT OR IGNORE INTO students
    (matricule, nom, prenom, age, classe, users_id)
    VALUES (?, ?, ?, ?, ?, ?)
`);

insertStudent.run(
    "15037",
    "Diallo",
    "Noura",
    16,
    "TleA",
    noura.id
);

insertStudent.run(
    "49023",
    "Coulibaly",
    "Amadou",
    17,
    "TleC",
    amadou.id
);


const insertTeacher = db.prepare(`
    INSERT OR IGNORE INTO teachers
    (name, matiere, users_id)
    VALUES (?, ?, ?)
`);

insertTeacher.run(
    "Keline",
    "Mathématiques",
    keline.id
);

insertTeacher.run(
    "Awa",
    "Français",
    awa.id
);


const teacher1 = db.prepare(`
    SELECT id FROM teachers WHERE users_id = ?
`).get(keline.id);

const teacher2 = db.prepare(`
    SELECT id FROM teachers WHERE users_id = ?
`).get(awa.id);


const insertSubject = db.prepare(`
    INSERT OR IGNORE INTO subjects
    (nom, teacher_id)
    VALUES (?, ?)
`);

insertSubject.run(
    "Mathématiques",
    teacher1.id
);

insertSubject.run(
    "Français",
    teacher2.id
);

insertSubject.run(
    "Anglais",
    teacher1.id
);


const student1 = db.prepare(`
    SELECT id FROM students WHERE matricule = ?
`).get("15037");

const student2 = db.prepare(`
    SELECT id FROM students WHERE matricule = ?
`).get("49023");


const math = db.prepare(`
    SELECT id FROM subjects WHERE nom = ?
`).get("Mathématiques");

const francais = db.prepare(`
    SELECT id FROM subjects WHERE nom = ?
`).get("Français");

const anglais = db.prepare(`
    SELECT id FROM subjects WHERE nom = ?
`).get("Anglais");


const insertGrade = db.prepare(`
    INSERT INTO grades
    (student_id, subject_id, note)
    SELECT ?, ?, ?
    WHERE NOT EXISTS (
        SELECT 1 FROM grades
        WHERE student_id = ?
        AND subject_id = ?
    )
`);

insertGrade.run(
    student1.id,
    math.id,
    15,
    student1.id,
    math.id
);

insertGrade.run(
    student1.id,
    francais.id,
    14,
    student1.id,
    francais.id
);

insertGrade.run(
    student1.id,
    anglais.id,
    16,
    student1.id,
    anglais.id
);

insertGrade.run(
    student2.id,
    math.id,
    12,
    student2.id,
    math.id
);

insertGrade.run(
    student2.id,
    francais.id,
    13,
    student2.id,
    francais.id
);

insertGrade.run(
    student2.id,
    anglais.id,
    11,
    student2.id,
    anglais.id
);


const insertAbsence = db.prepare(`
    INSERT INTO absences
    (student_id, date, status)
    SELECT ?, ?, ?
    WHERE NOT EXISTS (
        SELECT 1 FROM absences
        WHERE student_id = ?
        AND date = ?
    )
`);

insertAbsence.run(
    student1.id,
    "18/08/2026",
    "Absent",
    student1.id,
    "18/08/2026"
);

insertAbsence.run(
    student2.id,
    "18/08/2026",
    "Present",
    student2.id,
    "18/08/2026"
);

insertAbsence.run(
    student1.id,
    "19/08/2026",
    "Absent",
    student1.id,
    "19/08/2026"
);


console.log("=================================");
console.log(" Seed terminé avec succès !");
console.log("=================================");

console.log(" Utilisateurs :", 
    db.prepare("SELECT COUNT(*) AS total FROM users").get().total
);

console.log(" Étudiants :", 
    db.prepare("SELECT COUNT(*) AS total FROM students").get().total
);

console.log(" Professeurs :", 
    db.prepare("SELECT COUNT(*) AS total FROM teachers").get().total
);

console.log(" Matières :", 
    db.prepare("SELECT COUNT(*) AS total FROM subjects").get().total
);

console.log(" Notes :", 
    db.prepare("SELECT COUNT(*) AS total FROM grades").get().total
);

console.log(" Absences :", 
    db.prepare("SELECT COUNT(*) AS total FROM absences").get().total
);
