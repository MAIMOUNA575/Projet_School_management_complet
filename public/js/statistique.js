// ======================================
// statistics.js
// ======================================

// Vérifier l'authentification
checkAuth();

// Afficher l'utilisateur connecté
displayUser();


// ======================================
// Meilleur étudiant
// ======================================

async function loadBestStudent() {

    try {

        const student = await StatisticsAPI.bestStudent();

        document.getElementById("bestStudent").innerHTML = `
            <h3>Meilleur étudiant</h3>

            <p><strong>Nom :</strong> ${student.nom}</p>

            <p><strong>Prénom :</strong> ${student.prenom}</p>

            <p><strong>Moyenne :</strong> ${student.moyenne}</p>
        `;

    } catch (error) {

        console.error(error);

    }

}


// ======================================
// Moyenne générale
// ======================================

async function loadGeneralAverage() {

    try {

        const moyenne = await StatisticsAPI.generalAverage();

        document.getElementById("generalAverage").innerHTML = `
            <h3>Moyenne générale</h3>

            <p>${moyenne.moyenneGenerale}</p>
        `;

    } catch (error) {

        console.error(error);

    }

}


// ======================================
// Moyenne d'un étudiant
// ======================================

async function studentAverage() {

    const id = document.getElementById("studentId").value;

    if (!id) return;

    try {

        const moyenne = await StatisticsAPI.studentAverage(id);

        document.getElementById("studentAverage").innerHTML = `
            <h3>Moyenne de l'étudiant</h3>

            <p>${moyenne.moyenne}</p>
        `;

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Nombre d'absences
// ======================================

async function studentAbsences() {

    const id = document.getElementById("studentId").value;

    if (!id) return;

    try {

        const absence = await StatisticsAPI.studentAbsences(id);

        document.getElementById("studentAbsences").innerHTML = `
            <h3>Absences</h3>

            <p>Total : ${absence.total}</p>

            <p>Justifiées : ${absence.justifiees}</p>

            <p>Non justifiées : ${absence.nonJustifiees}</p>
        `;

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Statistiques complètes
// ======================================

async function studentStatistics() {

    const id = document.getElementById("studentId").value;

    if (!id) return;

    try {

        const stats = await StatisticsAPI.studentStatistics(id);

        document.getElementById("studentStatistics").innerHTML = `
            <h3>Statistiques</h3>

            <p><strong>Nom :</strong> ${stats.etudiant.nom}</p>

            <p><strong>Prénom :</strong> ${stats.etudiant.prenom}</p>

            <p><strong>Moyenne :</strong> ${stats.moyenne}</p>

            <p><strong>Absences :</strong> ${stats.absences.total}</p>
        `;

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Moyenne par matière
// ======================================

async function subjectAverage() {

    const id = document.getElementById("studentId").value;

    if (!id) return;

    try {

        const subjects = await StatisticsAPI.subjectAverage(id);

        const tbody = document.getElementById("subjectAverageTable");

        tbody.innerHTML = "";

        subjects.forEach(subject => {

            tbody.innerHTML += `
                <tr>

                    <td>${subject.matiere}</td>

                    <td>${Number(subject.moyenne).toFixed(2)}</td>

                </tr>
            `;

        });

    } catch (error) {

        alert(error.message);

    }

}


// ======================================
// Chargement initial
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    loadBestStudent();

    loadGeneralAverage();

});