// ======================================
// students.js
// ======================================

// Vérifier l'authentification
checkAuth();

// Afficher le nom de l'utilisateur connecté
displayUser();


// ======================================
// Charger tous les étudiants
// ======================================

async function loadStudents() {

    try {

        const students = await StudentAPI.getAll();

        const tbody = document.getElementById("studentsTable");

        tbody.innerHTML = "";

        students.forEach(student => {

            tbody.innerHTML += `
                <tr>
                    <td>${student.matricule}</td>
                    <td>${student.nom}</td>
                    <td>${student.prenom}</td>
                    <td>${student.age}</td>
                    <td>${student.classe}</td>
                    <td>${student.users_id}</td>
                    <td>
                        <button onclick="editStudent('${student.matricule}')">
                            Modifier
                        </button>

                        <button onclick="deleteStudentById('${student.matricule}')">
                            Supprimer
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);
        alert("Impossible de charger les étudiants.");

    }

}


// ======================================
// Ajouter un étudiant
// ======================================

async function addStudentForm(event) {

    event.preventDefault();

    const matricule = document.getElementById("matricule").value;
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const age = document.getElementById("age").value;
    const classe = document.getElementById("classe").value;
    const users_id = document.getElementById("users_id").value;

    try {

        await StudentAPI.create({
            matricule,
            nom,
            prenom,
            age,
            classe,
            users_id
        });

        alert("Étudiant ajouté.");

        document.getElementById("studentForm").reset();

        loadStudents();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Charger un étudiant
// ======================================

async function editStudent(matricule) {

    try {

        const student = await StudentAPI.getById(matricule);

        document.getElementById("matricule").value = student.matricule;
        document.getElementById("nom").value = student.nom;
        document.getElementById("prenom").value = student.prenom;
        document.getElementById("age").value = student.age;
        document.getElementById("classe").value = student.classe;
        document.getElementById("users_id").value = student.users_id;

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Modifier un étudiant
// ======================================

async function updateStudentForm() {

    const matricule = document.getElementById("matricule").value;

    try {

        await StudentAPI.update(matricule, {

            matricule,
            nom: document.getElementById("nom").value,
            prenom: document.getElementById("prenom").value,
            age: document.getElementById("age").value,
            classe: document.getElementById("classe").value,
            users_id: document.getElementById("users_id").value

        });

        alert("Étudiant modifié.");

        document.getElementById("studentForm").reset();

        loadStudents();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Supprimer
// ======================================

async function deleteStudentById(matricule) {

    if (!confirm("Supprimer cet étudiant ?")) {

        return;

    }

    try {

        await StudentAPI.delete(matricule);

        alert("Étudiant supprimé.");

        loadStudents();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Rechercher
// ======================================

async function searchStudent() {

    const matricule = document.getElementById("search").value;

    if (!matricule) {

        loadStudents();

        return;

    }

    try {

        const student = await StudentAPI.getById(matricule);

        const tbody = document.getElementById("studentsTable");

        tbody.innerHTML = `
            <tr>
                <td>${student.matricule}</td>
                <td>${student.nom}</td>
                <td>${student.prenom}</td>
                <td>${student.age}</td>
                <td>${student.classe}</td>
                <td>${student.users_id}</td>
                <td>
                    <button onclick="editStudent('${student.matricule}')">
                        Modifier
                    </button>

                    <button onclick="deleteStudentById('${student.matricule}')">
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

    loadStudents();

    const form = document.getElementById("studentForm");

    if (form) {

        form.addEventListener("submit", addStudentForm);

    }

});