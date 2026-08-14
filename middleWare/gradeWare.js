function verifierGrade(req, res, next) {

    const { student_id, subject_id, note } = req.body;

    // Vérifier les champs obligatoires
    if (!student_id || !subject_id || note === undefined) {
        return res.status(400).json({
            message: "Le student_id, le subject_id et la note sont obligatoires."
        });
    }

    // Vérifier que les identifiants sont numériques
    if (isNaN(student_id) || isNaN(subject_id)) {
        return res.status(400).json({
            message: "Le student_id et le subject_id doivent être des nombres."
        });
    }

    // Vérifier que la note est un nombre
    if (isNaN(note)) {
        return res.status(400).json({
            message: "La note doit être un nombre."
        });
    }

    // Vérifier que la note est comprise entre 0 et 20
    if (Number(note) < 0 || Number(note) > 20) {
        return res.status(400).json({
            message: "La note doit être comprise entre 0 et 20."
        });
    }

    next();
}

export { verifierGrade };