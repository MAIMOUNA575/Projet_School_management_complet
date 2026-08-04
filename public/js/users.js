// ======================================
// users.js
// ======================================

// Vérifier l'authentification
checkAuth();

// Afficher le nom de l'utilisateur connecté
displayUser();


// ======================================
// Charger tous les utilisateurs
// ======================================

async function loadUsers() {

    try {

        const users = await UserAPI.getAll();

        const tbody = document.getElementById("usersTable");

        tbody.innerHTML = "";

        users.forEach(user => {

            tbody.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.role}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser(${user.id})">
                            Modifier
                        </button>

                        <button onclick="deleteUserById(${user.id})">
                            Supprimer
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);
        alert("Impossible de charger les utilisateurs.");

    }

}


// ======================================
// Ajouter un utilisateur
// ======================================

async function addUserForm(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        await UserAPI.create({
            name,
            role,
            email,
            password
        });

        alert("Utilisateur ajouté.");

        document.getElementById("userForm").reset();

        loadUsers();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Modifier
// ======================================

async function editUser(id) {

    try {

        const user = await UserAPI.getById(id);

        document.getElementById("userId").value = user.id;
        document.getElementById("name").value = user.name;
        document.getElementById("role").value = user.role;
        document.getElementById("email").value = user.email;

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Sauvegarder les modifications
// ======================================

async function updateUserForm() {

    const id = document.getElementById("userId").value;

    try {

        await UserAPI.update(id, {

            name: document.getElementById("name").value,
            role: document.getElementById("role").value

        });

        alert("Utilisateur modifié.");

        document.getElementById("userForm").reset();

        loadUsers();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Supprimer
// ======================================

async function deleteUserById(id) {

    const confirmation = confirm("Supprimer cet utilisateur ?");

    if (!confirmation) {

        return;

    }

    try {

        await UserAPI.delete(id);

        alert("Utilisateur supprimé.");

        loadUsers();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Recherche
// ======================================

async function searchUser() {

    const id = document.getElementById("search").value;

    if (!id) {

        loadUsers();

        return;

    }

    try {

        const user = await UserAPI.getById(id);

        const tbody = document.getElementById("usersTable");

        tbody.innerHTML = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${user.id})">
                        Modifier
                    </button>

                    <button onclick="deleteUserById(${user.id})">
                        Supprimer
                    </button>
                </td>
            </tr>
        `;

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Initialisation
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    loadUsers();

    const form = document.getElementById("userForm");

    if (form) {

        form.addEventListener("submit", addUserForm);

    }

});