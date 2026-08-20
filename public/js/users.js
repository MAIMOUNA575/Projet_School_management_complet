document.addEventListener("DOMContentLoaded", async () => {

  const usersTable = document.getElementById("usersTable");

  const users = await getData("http://localhost:3000/api/users");

  console.log("UTILISATEURS :", users);

  if (!users || users.length === 0) {
    usersTable.innerHTML = `
      <tr>
        <td colspan="5">Aucun utilisateur trouvé</td>
      </tr>
    `;
    return;
  }

  usersTable.innerHTML = users.map(user => `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button onclick="modifierUser(${user.id})">
          Modifier
        </button>

        <button onclick="supprimerUser(${user.id})">
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


const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", () => {
  const userModal = document.getElementById("userModal");
  const closeModal = document.getElementById("closeModal");
  userModal.style.display = "flex";
});


const userForm = document.getElementById("userForm");

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;
  const password = document.getElementById("password").value;

  const user = {
    name: name,
    email: email,
    role: role,
    password: password
  }
  console.log("UTILISATEUR :", user);


  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(user)
  });
});
