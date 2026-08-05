// ======================================
// profile.js
// ======================================

// Vérifier la connexion
checkAuth();

// Charger le profil
loadProfile();


// ======================================
// Charger les informations du profil
// ======================================

async function loadProfile() {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {

            window.location.href = "login.html";

            return;

        }

        document.getElementById("userId").value = user.id;
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("role").value = user.role;

    } catch (error) {

        console.error(error);

        alert("Impossible de charger le profil.");

    }

}


// ======================================
// Modifier le profil
// ======================================

async function updateProfile(event) {

    event.preventDefault();

    const id = document.getElementById("userId").value;

    const data = {

        name: document.getElementById("name").value,
        role: document.getElementById("role").value

    };

    try {

        await UserAPI.update(id, data);

        // Mettre à jour le localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        user.name = data.name;
        user.role = data.role;

        localStorage.setItem("user", JSON.stringify(user));

        alert("Profil mis à jour avec succès.");

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Déconnexion
// ======================================

function logoutProfile() {

    if (!confirm("Voulez-vous vraiment vous déconnecter ?")) {

        return;

    }

    logout();

}


// ======================================
// Initialisation
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("profileForm");

    if (form) {

        form.addEventListener("submit", updateProfile);

    }

});