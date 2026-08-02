import { loginUser } from "../services/authService.js";

function login(req, res) {

    const { email, password } = req.body;

    const result = loginUser(email, password);

    if (!result) {
        return res.status(401).json({
            message: "Email ou mot de passe incorrect"
        });
    }

    res.json(result);
}

function me(req, res) {

    res.json({
        message: "Utilisateur authentifié",
        user: req.user
    });

}

export { login, me };