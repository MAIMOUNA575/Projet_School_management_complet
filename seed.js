import "./db/tables.js";
import db from "./db/database.js";


// Vérifier si les administrateurs existent déjà
const admin1 = db.prepare(`
    SELECT * FROM users
    WHERE email = ?
`).get("mouna@gmail.com");

const admin2 = db.prepare(`
    SELECT * FROM users
    WHERE email = ?
`).get("admin2@gmail.com");

// Préparer l'insertion
const insertUser = db.prepare(`
    INSERT INTO users (name, role, email, password)
    VALUES (?, ?, ?, ?)
`);

// Ajouter le premier administrateur
if (!admin1) {
    insertUser.run(
        "Mouna",
        "admin",
        "mouna@gmail.com",
        "mouna123"
    );

    console.log(" Admin Principal ajouté.");
} else {
    console.log(" Admin Principal existe déjà.");
}

// Ajouter le deuxième administrateur
if (!admin2) {
    insertUser.run(
        "Super Admin",
        "admin",
        "admin2@gmail.com",
        "admin456"
    );

    console.log("Super Admin ajouté.");
} else {
    console.log("Super Admin existe déjà.");
}