// Vérifier si l'utilisateur est connecté
function Authentication() {
  return localStorage.getItem("token") !== null;
}

// Récupérer le token
function getToken() {
  return localStorage.getItem("token");
}

// Récupérer les informations de l'utilisateur
function getUser() {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

// Connexion
async function login(email, password) {
  try {
    const result = await AuthAPI.login({
      email,
      password,
    });

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    alert("Connexion réussie.");

    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
}

// Déconnexion
function Deconnexion() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "login.html";
}

// Vérifier si la page est protégée
function checkAuth() {
  if (!Authentication()) {
    window.location.href = "login.html";
  }
}

// Vérifier si l'utilisateur est administrateur
function isAdmin() {
  const user = getUser();

  return user && user.role === "admin";
}

// Vérifier si l'utilisateur est professeur
function isTeacher() {
  const user = getUser();

  return user && user.role === "teacher";
}

// Vérifier si l'utilisateur est étudiant
function isStudent() {
  const user = getUser();

  return user && user.role === "student";
}

// Afficher le nom de l'utilisateur
function AfficherNomUser() {
  const user = getUser();

  if (!user) {
    return;
  }

  const username = document.getElementById("username");

  if (username) {
    username.textContent = user.name;
  }
}
