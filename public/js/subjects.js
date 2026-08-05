// ======================================
// subjects.js
// ======================================

// Vérifier que l'utilisateur est connecté
checkAuth();

// Afficher le nom de l'utilisateur connecté
displayUser();


// ======================================
// Charger toutes les matières
// ======================================

async function loadSubjects() {

    try {

        const subjects = await SubjectAPI.getAll();

        const tbody = document.getElementById("subjectsTable");

        tbody.innerHTML = "";

        subjects.forEach(subject => {

            tbody.innerHTML += `
                <tr>
                    <td>${subject.id}</td>
                    <td>${subject.nom}</td>
                    <td>${subject.teacher_id}</td>
                    <td>

                        <button onclick="editSubject(${subject.id})">
                            Modifier
                        </button>

                        <button onclick="deleteSubjectById(${subject.id})">
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
// Ajouter une matière
// ======================================

async function addSubjectForm(event) {

    event.preventDefault();

    const nom = document.getElementById("nom").value;
    const teacher_id = document.getElementById("teacher_id").value;

    try {

        await SubjectAPI.create({

            nom,
            teacher_id

        });

        alert("Matière ajoutée.");

        document.getElementById("subjectForm").reset();

        loadSubjects();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Charger une matière
// ======================================

async function editSubject(id) {

    try {

        const subject = await SubjectAPI.getById(id);

        document.getElementById("subjectId").value = subject.id;
        document.getElementById("nom").value = subject.nom;
        document.getElementById("teacher_id").value = subject.teacher_id;

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Modifier une matière
// ======================================

async function updateSubjectForm() {

    const id = document.getElementById("subjectId").value;

    try {

        await SubjectAPI.update(id, {

            nom: document.getElementById("nom").value

        });

        alert("Matière modifiée.");

        document.getElementById("subjectForm").reset();

        loadSubjects();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Supprimer une matière
// ======================================

async function deleteSubjectById(id) {

    if (!confirm("Voulez-vous supprimer cette matière ?")) {

        return;

    }

    try {

        await SubjectAPI.delete(id);

        alert("Matière supprimée.");

        loadSubjects();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Rechercher une matière
// ======================================

async function searchSubject() {

    const id = document.getElementById("search").value;

    if (!id) {

        loadSubjects();

        return;

    }

    try {

        const subject = await SubjectAPI.getById(id);

        const tbody = document.getElementById("subjectsTable");

        tbody.innerHTML = `
            <tr>
                <td>${subject.id}</td>
                <td>${subject.nom}</td>
                <td>${subject.teacher_id}</td>
                <td>

                    <button onclick="editSubject(${subject.id})">
                        Modifier
                    </button>

                    <button onclick="deleteSubjectById(${subject.id})">
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

    loadSubjects();

    const form = document.getElementById("subjectForm");

    if (form) {

        form.addEventListener("submit", addSubjectForm);

    }

});