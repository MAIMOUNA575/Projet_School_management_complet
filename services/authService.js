import db from "../db/data.js";
import jwt from "jsonwebtoken";

function loginUser(email, password) {

    if (!email || !password) {
        console.error("L'email et le mot de passe sont obligatoires.");
        return null;
    }

    // Rechercher l'utilisateur
    const user = db.prepare(`
        SELECT * FROM users
        WHERE email = ?
    `).get(email);

    if (!user) {
        console.error("Utilisateur introuvable.");
        return null;
    }

    // Vérifier le mot de passe
    if (user.password !== password) {
        console.error("Mot de passe incorrect.");
        return null;
    }

    // Générer le token
    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );

    return {
        message: "Connexion réussie",
        token,
        user: {
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email
        }
    };
}

export { loginUser };