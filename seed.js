import db from "./data.js";

// Supprimer les anciennes données
db.prepare("DELETE FROM absences").run();
db.prepare("DELETE FROM grades").run();
db.prepare("DELETE FROM subjects").run();
db.prepare("DELETE FROM teachers").run();
db.prepare("DELETE FROM students").run();
db.prepare("DELETE FROM users").run();


db.prepare("DELETE FROM sqlite_sequence WHERE name='users'").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name='students'").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name='teachers'").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name='subjects'").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name='grades'").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name='absences'").run();

console.log("Anciennes données supprimées.");


db.prepare(`
INSERT INTO users(name, role, email, password)
VALUES (?, ?, ?, ?)
`).run("Administrateur", "admin", "admin@gmail.com", "admin123");

db.prepare(`
INSERT INTO users(name, role, email, password)
VALUES (?, ?, ?, ?)
`).run("Jean Kouassi", "teacher", "jean@gmail.com", "teacher123");

db.prepare(`
INSERT INTO users(name, role, email, password)
VALUES (?, ?, ?, ?)
`).run("Marie Konan", "teacher", "marie@gmail.com", "teacher123");

db.prepare(`
INSERT INTO users(name, role, email, password)
VALUES (?, ?, ?, ?)
`).run("Mamadou Coulibaly", "student", "mamadou@gmail.com", "student123");

db.prepare(`
INSERT INTO users(name, role, email, password)
VALUES (?, ?, ?, ?)
`).run("Awa Traoré", "student", "awa@gmail.com", "student123");

console.log("Utilisateurs ajoutés.");


db.prepare(`
INSERT INTO teachers(name,matiere,users_id)
VALUES(?,?,?)
`).run("Jean Kouassi", "Mathématiques", 2);

db.prepare(`
INSERT INTO teachers(name,matiere,users_id)
VALUES(?,?,?)
`).run("Marie Konan", "Français", 3);

console.log("Professeurs ajoutés.");


db.prepare(`
INSERT INTO subjects(nom,teacher_id)
VALUES(?,?)
`).run("Mathématiques", 1);

db.prepare(`
INSERT INTO subjects(nom,teacher_id)
VALUES(?,?)
`).run("Français", 2);

console.log("Matières ajoutées.");


db.prepare(`
INSERT INTO students(matricule,nom,prenom,age,classe,users_id)
VALUES(?,?,?,?,?,?)
`).run("MAT001", "Coulibaly", "Mamadou", 16, "TleA", 4);

db.prepare(`
INSERT INTO students(matricule,nom,prenom,age,classe,users_id)
VALUES(?,?,?,?,?,?)
`).run("MAT002", "Traoré", "Awa", 17, "TleA", 5);

console.log("Étudiants ajoutés.");


db.prepare(`
INSERT INTO grades(student_id,subject_id,note)
VALUES(?,?,?)
`).run(1, 1, 18);

db.prepare(`
INSERT INTO grades(student_id,subject_id,note)
VALUES(?,?,?)
`).run(1, 2, 15);

db.prepare(`
INSERT INTO grades(student_id,subject_id,note)
VALUES(?,?,?)
`).run(2, 1, 12);

db.prepare(`
INSERT INTO grades(student_id,subject_id,note)
VALUES(?,?,?)
`).run(2, 2, 16);

console.log("Notes ajoutées.");


db.prepare(`
INSERT INTO absences(student_id,date,status)
VALUES(?,?,?)
`).run(1, "2026-07-20", 1);

db.prepare(`
INSERT INTO absences(student_id,date,status)
VALUES(?,?,?)
`).run(1, "2026-07-22", 0);

db.prepare(`
INSERT INTO absences(student_id,date,status)
VALUES(?,?,?)
`).run(2, "2026-07-23", 1);

console.log("Absences ajoutées.");
