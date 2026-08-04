// ======================================
// dashboard.js
// ======================================

// Vérifier que l'utilisateur est connecté
checkAuth();

// Afficher les informations de l'utilisateur
displayUser();


// ======================================
// Chargement du tableau de bord
// ======================================

async function chargerDashboard() {

    try {

        // Chargement des données
        const users = await UserAPI.getAll();
        const students = await StudentAPI.getAll();
        const teachers = await TeacherAPI.getAll();
        const subjects = await SubjectAPI.getAll();
        const absences = await AbsenceAPI.getAll();

        // Affichage des statistiques
        document.getElementById("totalUsers").textContent = users.length;
        document.getElementById("totalStudents").textContent = students.length;
        document.getElementById("totalTeachers").textContent = teachers.length;
        document.getElementById("totalSubjects").textContent = subjects.length;
        document.getElementById("totalAbsences").textContent = absences.length;

    } catch (error) {

        console.error(error);
        alert("Impossible de charger les statistiques.");

    }

}


// ======================================
// Meilleur étudiant
// ======================================

async function chargerMeilleurEtudiant() {

    try {

        const meilleur = await StatisticsAPI.bestStudent();

        if (!meilleur) {

            document.getElementById("bestStudent").textContent = "-";
            document.getElementById("bestAverage").textContent = "-";

            return;
        }

        document.getElementById("bestStudent").textContent =
            `${meilleur.nom} ${meilleur.prenom}`;

        document.getElementById("bestAverage").textContent =
            Number(meilleur.moyenne).toFixed(2);

    } catch (error) {

        console.error(error);

    }

}


// ======================================
// Moyenne générale
// ======================================

async function chargerMoyenneGenerale() {

    try {

        const moyenne = await StatisticsAPI.generalAverage();

        document.getElementById("generalAverage").textContent =
            Number(moyenne.moyenneGenerale).toFixed(2);

    } catch (error) {

        console.error(error);

    }

}


// ======================================
// Date et heure
// ======================================

function afficherDate() {

    const date = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const element = document.getElementById("currentDate");

    if (element) {
        element.textContent = date.toLocaleDateString("fr-FR", options);
    }

}


// ======================================
// Bienvenue
// ======================================

function afficherBienvenue() {

    const user = getUser();

    if (!user) return;

    const message = document.getElementById("welcomeMessage");

    if (message) {

        message.textContent = `Bienvenue ${user.name}`;

    }

}


// ======================================
// Bouton Déconnexion
// ======================================

const logoutButton = document.getElementById("logout");

if (logoutButton) {

    logoutButton.addEventListener("click", logout);

}


// ======================================
// Initialisation
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    afficherBienvenue();

    afficherDate();

    chargerDashboard();

    chargerMeilleurEtudiant();

    chargerMoyenneGenerale();

});