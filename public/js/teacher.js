document.addEventListener("DOMContentLoaded", async () => {

  const teacherTable = document.getElementById("teacherTable");

  const teachers = await getData("http://localhost:3000/api/users");

  console.log("ENSEIGNANTS :", teachers);

  if (!teachers || teachers.length === 0) {
    teacherTable.innerHTML = `
      <tr>
        <td colspan="5">Aucun enseignant trouvé</td>
      </tr>
    `;
    return;
  }

  teacherTable.innerHTML = teachers.map(teacher => `
    <tr>
      <td>${teacher.id}</td>
      <td>${teacher.Matière}</td>
      <td>${teacher.Utilisateur}</td>
      <td>${teacher.Actions}</td>
      <td>
        <button onclick="modifierUser(${teacher.id})">
          Modifier
        </button>

        <button onclick="supprimerUser(${teacher.id})">
          Supprimer
        </button>
      </td>
    </tr>
  `).join("");

});


async function getData(url) {

  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();

  return data;
}
