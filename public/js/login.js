// ======================================
// PAGE DE CONNEXION
// ======================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        try {

            await login(email, password);

        } catch (error) {

            alert(error.message);

        }

    });

}


// ======================================
// SI L'UTILISATEUR EST DÉJÀ CONNECTÉ
// ======================================

if (isAuthenticated()) {

    window.location.href = "index.html";

}