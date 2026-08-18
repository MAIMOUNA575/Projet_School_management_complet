
const loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault()
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  if (!email || !password) {
    console.log("Veuillez remplir tous les champs.")
    return
  }
  const data = {

    email: email,
    password: password
  }
  try {
    const reponse = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const resultat = await reponse.json()
    if (!reponse.ok) {
      console.log(resultat.message)
      return
    }
    localStorage.setItem("token", resultat.token)

    localStorage.setItem("user", JSON.stringify(resultat.user))
    window.location.href = '/acceuil'
  }

  catch (error) {
    console.error("Erreur lors de la connexion :", error)
  }
});