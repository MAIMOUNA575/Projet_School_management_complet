function verifierSubject(req, res, next) {

    const { nom, teacher_id } = req.body;

    // Vérifier les champs obligatoires
    if (!nom || !teacher_id) {
        return res.status(400).json({
            message: "Le nom de la matière et l'identifiant du professeur sont obligatoires."
        });
    }

    // Vérifier le nom de la matière
    if (nom.trim().length < 2) {
        return res.status(400).json({
            message: "Le nom de la matière doit contenir au moins 2 caractères."
        });
    }

    // Vérifier l'identifiant du professeur
    if (isNaN(teacher_id)) {
        return res.status(400).json({
            message: "L'identifiant du professeur doit être un nombre."
        });
    }

    next();

}

export { verifierSubject };