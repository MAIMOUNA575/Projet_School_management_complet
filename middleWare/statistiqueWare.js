function verifierStatistique(req, res, next) {

    const { id } = req.params;

    // Vérifier que l'identifiant est fourni
    if (!id) {
        return res.status(400).json({
            message: "L'identifiant de l'étudiant est obligatoire."
        });
    }

    // Vérifier que l'identifiant est un nombre
    if (isNaN(id)) {
        return res.status(400).json({
            message: "L'identifiant doit être un nombre."
        });
    }

    next();

}

export { verifierStatistique };