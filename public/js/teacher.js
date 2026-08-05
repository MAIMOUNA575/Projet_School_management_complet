// ======================================
// teachers.js
// ======================================

// Vérifier que l'utilisateur est connecté
checkAuth();

// Afficher le nom de l'utilisateur
displayUser();


// ======================================
// Charger les enseignants
// ======================================

async function loadTeachers() {

    try {

        const teachers = await TeacherAPI.getAll();

        const tbody = document.getElementById("teachersTable");

        tbody.innerHTML = "";

        teachers.forEach(teacher => {

            tbody.innerHTML += `
                <tr>
                    <td>${teacher.id}</td>
                    <td>${teacher.name}</td>
                    <td>${teacher.matiere}</td>
                    <td>${teacher.users_id}</td>
                    <td>

                        <button onclick="editTeacher(${teacher.id})">
                            Modifier
                        </button>

                        <button onclick="deleteTeacherById(${teacher.id})">
                            Supprimer
                        </button>

                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

}


// ======================================
// Ajouter un enseignant
// ======================================

async function addTeacherForm(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const matiere = document.getElementById("matiere").value;
    const users_id = document.getElementById("users_id").value;

    try {

        await TeacherAPI.create({

            name,
            matiere,
            users_id

        });

        alert("Enseignant ajouté.");

        document.getElementById("teacherForm").reset();

        loadTeachers();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Rechercher un enseignant
// ======================================

async function searchTeacher() {

    const id = document.getElementById("search").value;

    if (!id) {

        loadTeachers();

        return;

    }

    try {

        const teacher = await TeacherAPI.getById(id);

        const tbody = document.getElementById("teachersTable");

        tbody.innerHTML = `
            <tr>
                <td>${teacher.id}</td>
                <td>${teacher.name}</td>
                <td>${teacher.matiere}</td>
                <td>${teacher.users_id}</td>
                <td>

                    <button onclick="editTeacher(${teacher.id})">
                        Modifier
                    </button>

                    <button onclick="deleteTeacherById(${teacher.id})">
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
// Charger les informations
// ======================================

async function editTeacher(id) {

    try {

        const teacher = await TeacherAPI.getById(id);

        document.getElementById("teacherId").value = teacher.id;
        document.getElementById("name").value = teacher.name;
        document.getElementById("matiere").value = teacher.matiere;
        document.getElementById("users_id").value = teacher.users_id;

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Modifier
// ======================================

async function updateTeacherForm() {

    const id = document.getElementById("teacherId").value;

    try {

        await TeacherAPI.update(id, {

            name: document.getElementById("name").value,
            matiere: document.getElementById("matiere").value,
            users_id: document.getElementById("users_id").value

        });

        alert("Enseignant modifié.");

        document.getElementById("teacherForm").reset();

        loadTeachers();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Supprimer
// ======================================

async function deleteTeacherById(id) {

    if (!confirm("Voulez-vous supprimer cet enseignant ?")) {

        return;

    }

    try {

        await TeacherAPI.delete(id);

        alert("Enseignant supprimé.");

        loadTeachers();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Initialisation
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    loadTeachers();

    const form = document.getElementById("teacherForm");

    if (form) {

        form.addEventListener("submit", addTeacherForm);

    }

});