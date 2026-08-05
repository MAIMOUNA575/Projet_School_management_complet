// ======================================
// grades.js
// ======================================

// Vérifier l'authentification
checkAuth();

// Afficher le nom de l'utilisateur connecté
displayUser();


// ======================================
// Charger toutes les notes
// ======================================

async function loadGrades() {

    try {

        const grades = await GradeAPI.getAll();

        const tbody = document.getElementById("gradesTable");

        tbody.innerHTML = "";

        grades.forEach(grade => {

            tbody.innerHTML += `
                <tr>
                    <td>${grade.id}</td>
                    <td>${grade.student_id}</td>
                    <td>${grade.subject_id}</td>
                    <td>${grade.note}</td>

                    <td>

                        <button onclick="editGrade(${grade.id})">
                            Modifier
                        </button>

                        <button onclick="deleteGradeById(${grade.id})">
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
// Ajouter une note
// ======================================

async function addGradeForm(event) {

    event.preventDefault();

    const student_id = document.getElementById("student_id").value;
    const subject_id = document.getElementById("subject_id").value;
    const note = document.getElementById("note").value;

    try {

        await GradeAPI.create({

            student_id,
            subject_id,
            note

        });

        alert("Note ajoutée.");

        document.getElementById("gradeForm").reset();

        loadGrades();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Charger une note
// ======================================

async function editGrade(id) {

    try {

        const grade = await GradeAPI.getById(id);

        document.getElementById("gradeId").value = grade.id;
        document.getElementById("student_id").value = grade.student_id;
        document.getElementById("subject_id").value = grade.subject_id;
        document.getElementById("note").value = grade.note;

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Modifier une note
// ======================================

async function updateGradeForm() {

    const id = document.getElementById("gradeId").value;

    try {

        await GradeAPI.update(id, {

            student_id: document.getElementById("student_id").value,
            subject_id: document.getElementById("subject_id").value,
            note: document.getElementById("note").value

        });

        alert("Note modifiée.");

        document.getElementById("gradeForm").reset();

        loadGrades();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Supprimer une note
// ======================================

async function deleteGradeById(id) {

    if (!confirm("Voulez-vous supprimer cette note ?")) {

        return;

    }

    try {

        await GradeAPI.delete(id);

        alert("Note supprimée.");

        loadGrades();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Rechercher une note
// ======================================

async function searchGrade() {

    const id = document.getElementById("search").value;

    if (!id) {

        loadGrades();

        return;

    }

    try {

        const grade = await GradeAPI.getById(id);

        const tbody = document.getElementById("gradesTable");

        tbody.innerHTML = `
            <tr>
                <td>${grade.id}</td>
                <td>${grade.student_id}</td>
                <td>${grade.subject_id}</td>
                <td>${grade.note}</td>

                <td>

                    <button onclick="editGrade(${grade.id})">
                        Modifier
                    </button>

                    <button onclick="deleteGradeById(${grade.id})">
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

    loadGrades();

    const form = document.getElementById("gradeForm");

    if (form) {

        form.addEventListener("submit", addGradeForm);

    }

});