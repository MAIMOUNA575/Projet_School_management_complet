import { addUser, updateUser, deleteUser, rechercheUser, listerUsers } from "../services/userService.js";


function lister_User(req, res) {
    res.json(listerUsers());
}

function recherche_User(req, res) {
    const user = rechercheUser(req.params.id);
    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }
    res.json(user);
}

function add_User(req, res) {
    const { name, role, email, password } = req.body;

    const user = addUser(name, role, email, password);

    res.status(201).json(user);
}

function update_User(req, res) {
    const { name, role } = req.body;

    const user = updateUser(
        req.params.id,
        name,
        role
    );

    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }

    res.json({
        message: "Utilisateur modifié avec succès"
    });
}

function delete_User(req, res) {
    const user = deleteUser(req.params.id);
    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }
    res.json({
        message: "Utilisateur supprimé avec succès"
    });
}

export { lister_User, recherche_User, add_User, update_User, delete_User }