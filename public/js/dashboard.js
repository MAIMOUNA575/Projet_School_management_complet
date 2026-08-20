document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = document.getElementById("userName");
  userName.textContent = `Bienvenue, ${user.name}`;

  const students = await getData("http://localhost:3000/api/students");
  const studentsCount = document.getElementById("studentsCount");
  studentsCount.textContent = students.length;

  const teachers = await getData("http://localhost:3000/api/teachers");
  const teachersCount = document.getElementById("teachersCount");
  teachersCount.textContent = teachers.length;

  const subjects = await getData("http://localhost:3000/api/subjects");
  const subjectsCount = document.getElementById("subjectsCount");
  subjectsCount.textContent = subjects.length;

  const absences = await getData("http://localhost:3000/api/absences");
  const absencesCount = document.getElementById("absencesCount");
  absencesCount.textContent = absences.length;

  const grades = await getData("http://localhost:3000/api/grades");
  const gradesCount = document.getElementById("gradesCount");
  gradesCount.textContent = grades.length;

  const statistiques = await getData("http://localhost:3000/api/statistiques/moyenne-generale");
  const average = document.getElementById("average");
  average.textContent = statistiques.moyenne_generale.toFixed(2);


  const meilleur = await getData("http://localhost:3000/api/statistiques/meilleur");

  console.log("MEILLEUR ÉTUDIANT :", meilleur);

  const bestStudent = document.getElementById("bestStudent");

  if (meilleur) {
    bestStudent.innerHTML = `
    <tr>
      <td>${meilleur.nom}</td>
      <td>${meilleur.prenom}</td>
      <td>${meilleur.classe}</td>
      <td>${meilleur.moyenne.toFixed(2)}</td>
    </tr>
  `;
  }

  await afficherActivites();
});

async function getData(url) {
  const token = localStorage.getItem("token");

  const reponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  console.log("URL :", url);
  console.log("STATUS :", reponse.status);

  const data = await reponse.json();

  console.log("DATA :", data);

  return data;
}

async function afficherActivites() {

  const students = await getData("http://localhost:3000/api/students");
  const teachers = await getData("http://localhost:3000/api/teachers");
  const subjects = await getData("http://localhost:3000/api/subjects");
  const grades = await getData("http://localhost:3000/api/grades");
  const absences = await getData("http://localhost:3000/api/absences");

  const activity = document.getElementById("activity");

  let activities = [];

  // 3 derniers étudiants
  students
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .forEach(student => {
      activities.push(
        `Étudiant ajouté : ${student.nom} ${student.prenom}`
      );
    });

  // 3 derniers professeurs
  teachers
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .forEach(teacher => {
      activities.push(
        `Professeur ajouté : ${teacher.nom}`
      );
    });

  // 3 dernières matières
  subjects
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .forEach(subject => {
      activities.push(
        `Matière ajoutée : ${subject.nom}`
      );
    });

  // 3 dernières notes
  grades
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .forEach(grade => {
      activities.push(
        `Note ajoutée : ${grade.note}/20`
      );
    });

  // 3 dernières absences
  absences
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .forEach(absence => {
      activities.push(
        `Absence enregistrée : étudiant ${absence.student_id}`
      );
    });

  // Afficher seulement les 10 dernières activités
  activity.innerHTML = activities
    .slice(0, 10)
    .map(item => `<li>${item}</li>`)
    .join("");
}