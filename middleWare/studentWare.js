function verifierStudent(req, res, next) {

    const {
        matricule,
        nom,
        prenom,
        age,
        classe,
        users_id
    } = req.body;

    // Vérifier les champs obligatoires
    if (!matricule || !nom || !prenom || age === undefined || !classe || !users_id) {
        return res.status(400).json({
            message: "Tous les champs sont obligatoires."
        });
    }

    // Vérifier le matricule
    if (isNaN(matricule)) {
        return res.status(400).json({
            message: "Le matricule doit être un nombre."
        });
    }

    // Vérifier l'âge
    if (isNaN(age)) {
        return res.status(400).json({
            message: "L'âge doit être un nombre."
        });
    }

    if (Number(age) < 0 || Number(age) > 100) {
        return res.status(400).json({
            message: "L'âge doit être compris entre 0 et 100."
        });
    }

    // Vérifier l'identifiant utilisateur
    if (isNaN(users_id)) {
        return res.status(400).json({
            message: "L'identifiant utilisateur doit être un nombre."
        });
    }

    next();

}

export { verifierStudent };