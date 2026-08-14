function verifierAbsence(req, res, next) {

    const { student_id, date, status } = req.body;

    // Vérifier les champs obligatoires
    if (!student_id || !date || status === undefined) {
        return res.status(400).json({
            message: "Le student_id, la date et le status sont obligatoires."
        });
    }

    // Vérifier que student_id est un nombre
    if (isNaN(student_id)) {
        return res.status(400).json({
            message: "Le student_id doit être un nombre."
        });
    }

    // Vérifier le format de la date
    if (isNaN(Date.parse(date))) {
        return res.status(400).json({
            message: "La date est invalide."
        });
    }

    // Vérifier le status
    if (status !== 0 && status !== 1 && status !== "0" && status !== "1") {
        return res.status(400).json({
            message: "Le status doit être 0 (non justifiée) ou 1 (justifiée)."
        });
    }

    next();
}

export { verifierAbsence };