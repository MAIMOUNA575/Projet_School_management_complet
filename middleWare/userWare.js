function verifierUser(req, res, next) {

    const { name, role, email, password } = req.body;

    // Vérifier les champs obligatoires
    if (!name || !role || !email || !password) {
        return res.status(400).json({
            message: "Le nom, le rôle, l'email et le mot de passe sont obligatoires."
        });
    }

    // Vérifier le nom
    if (name.trim().length < 2) {
        return res.status(400).json({
            message: "Le nom doit contenir au moins 2 caractères."
        });
    }

    // Vérifier le rôle
    const rolesValides = ["admin", "teacher", "student"];

    if (!rolesValides.includes(role)) {
        return res.status(400).json({
            message: "Le rôle doit être admin, teacher ou student."
        });
    }

    // Vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "L'adresse email est invalide."
        });
    }

    // Vérifier le mot de passe
    if (password.length < 6) {
        return res.status(400).json({
            message: "Le mot de passe doit contenir au moins 6 caractères."
        });
    }

    next();

}

export { verifierUser };