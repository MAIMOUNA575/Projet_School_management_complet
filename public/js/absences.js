// ======================================
// absences.js
// ======================================

// Vérifier l'authentification
checkAuth();

// Afficher l'utilisateur connecté
displayUser();


// ======================================
// Charger toutes les absences
// ======================================

async function loadAbsences() {

    try {

        const absences = await AbsenceAPI.getAll();

        const tbody = document.getElementById("absencesTable");

        tbody.innerHTML = "";

        absences.forEach(absence => {

            tbody.innerHTML += `
                <tr>
                    <td>${absence.id}</td>
                    <td>${absence.student_id}</td>
                    <td>${absence.date}</td>
                    <td>${absence.status ? "Justifiée" : "Non justifiée"}</td>

                    <td>

                        <button onclick="editAbsence(${absence.id})">
                            Modifier
                        </button>

                        <button onclick="deleteAbsenceById(${absence.id})">
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
// Ajouter une absence
// ======================================

async function addAbsenceForm(event) {

    event.preventDefault();

    const student_id = document.getElementById("student_id").value;
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;

    try {

        await AbsenceAPI.create({

            student_id,
            date,
            status

        });

        alert("Absence ajoutée.");

        document.getElementById("absenceForm").reset();

        loadAbsences();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Charger une absence
// ======================================

async function editAbsence(id) {

    try {

        const absence = await AbsenceAPI.getById(id);

        document.getElementById("absenceId").value = absence.id;
        document.getElementById("student_id").value = absence.student_id;
        document.getElementById("date").value = absence.date;
        document.getElementById("status").value = absence.status;

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Modifier une absence
// ======================================

async function updateAbsenceForm() {

    const id = document.getElementById("absenceId").value;

    try {

        await AbsenceAPI.update(id, {

            student_id: document.getElementById("student_id").value,
            date: document.getElementById("date").value,
            status: document.getElementById("status").value

        });

        alert("Absence modifiée.");

        document.getElementById("absenceForm").reset();

        loadAbsences();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Supprimer
// ======================================

async function deleteAbsenceById(id) {

    if (!confirm("Voulez-vous supprimer cette absence ?")) {

        return;

    }

    try {

        await AbsenceAPI.delete(id);

        alert("Absence supprimée.");

        loadAbsences();

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Rechercher une absence
// ======================================

async function searchAbsence() {

    const id = document.getElementById("search").value;

    if (!id) {

        loadAbsences();

        return;

    }

    try {

        const absence = await AbsenceAPI.getById(id);

        const tbody = document.getElementById("absencesTable");

        tbody.innerHTML = `
            <tr>
                <td>${absence.id}</td>
                <td>${absence.student_id}</td>
                <td>${absence.date}</td>
                <td>${absence.status ? "Justifiée" : "Non justifiée"}</td>

                <td>

                    <button onclick="editAbsence(${absence.id})">
                        Modifier
                    </button>

                    <button onclick="deleteAbsenceById(${absence.id})">
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

    loadAbsences();

    const form = document.getElementById("absenceForm");

    if (form) {

        form.addEventListener("submit", addAbsenceForm);

    }

});