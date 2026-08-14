function verifierTeacher(req, res, next) {

    const { name, matiere, users_id } = req.body;

    // Vérifier les champs obligatoires
    if (!name || !matiere || !users_id) {
        return res.status(400).json({
            message: "Le nom, la matière et l'identifiant utilisateur sont obligatoires."
        });
    }

    // Vérifier le nom
    if (name.trim().length < 2) {
        return res.status(400).json({
            message: "Le nom doit contenir au moins 2 caractères."
        });
    }

    // Vérifier la matière
    if (matiere.trim().length < 2) {
        return res.status(400).json({
            message: "Le nom de la matière doit contenir au moins 2 caractères."
        });
    }

    // Vérifier users_id
    if (isNaN(users_id)) {
        return res.status(400).json({
            message: "L'identifiant utilisateur doit être un nombre."
        });
    }

    next();

}

export { verifierTeacher };