// ======================================
// modal.js
// ======================================


// Ouvrir une fenêtre modale
function openModal(modalId) {

    const modal = document.getElementById(modalId);

    if (modal) {
        modal.style.display = "flex";
    }

}


// Fermer une fenêtre modale
function closeModal(modalId) {

    const modal = document.getElementById(modalId);

    if (modal) {
        modal.style.display = "none";
    }

}


// Fermer la fenêtre si on clique en dehors
window.addEventListener("click", (event) => {

    const modals = document.querySelectorAll(".modal");

    modals.forEach(modal => {

        if (event.target === modal) {
            modal.style.display = "none";
        }

    });

});


// Fermer avec la touche Échap
window.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        document.querySelectorAll(".modal").forEach(modal => {

            modal.style.display = "none";

        });

    }

});