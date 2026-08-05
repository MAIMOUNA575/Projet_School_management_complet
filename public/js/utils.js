// ======================================
// utils.js
// Fonctions utilitaires
// ======================================


// Afficher un message
function showMessage(message) {
    alert(message);
}


// Demander une confirmation
function confirmAction(message = "Êtes-vous sûr ?") {
    return confirm(message);
}


// Vider un formulaire
function clearForm(formId) {

    const form = document.getElementById(formId);

    if (form) {
        form.reset();
    }

}


// Remplir un formulaire automatiquement
function fillForm(formId, data) {

    const form = document.getElementById(formId);

    if (!form) return;

    Object.keys(data).forEach(key => {

        const input = form.querySelector(`[name="${key}"]`);

        if (input) {
            input.value = data[key];
        }

    });

}


// Convertir une date
function formatDate(date) {

    if (!date) return "";

    return new Date(date).toLocaleDateString("fr-FR");

}


// Convertir un booléen en texte
function formatStatus(status) {

    return status
        ? "Oui"
        : "Non";

}


// Générer un identifiant aléatoire
function generateId() {

    return Math.random().toString(36).substring(2, 10);

}


// Afficher le nom de l'utilisateur connecté
function displayUser() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const element = document.getElementById("currentUser");

    if (element) {

        element.textContent = `${user.name} (${user.role})`;

    }

}


// Déconnexion
function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}