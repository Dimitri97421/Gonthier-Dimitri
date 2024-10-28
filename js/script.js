let currentSection = "home"; // Section actuelle
let isAnimating = false; // État d'animation

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Événement pour ouvrir/fermer le menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show'); // Affiche ou masque le menu
    menuToggle.classList.toggle('active'); // Ajoute ou enlève la classe active
});

// Événement de défilement pour passer de home à accueil
window.addEventListener('wheel', (event) => {
    // Ne rien faire si une animation est en cours
    if (isAnimating) return;

    if (event.deltaY > 0 && currentSection === "home") {
        // Scroll vers le bas, passer de home à accueil
        isAnimating = true; // Début de l'animation
        document.querySelector('.home').style.opacity = '0'; // Rendre la section actuelle invisible
        document.querySelector('.home').style.transform = 'translateY(-100%)'; // Déplacer la section actuelle vers le haut
        document.querySelector('.accueil').style.opacity = '1'; // Rendre la section d'accueil visible
        document.querySelector('.accueil').style.transform = 'translateY(0)'; // Remettre accueil dans la vue
        currentSection = "accueil"; // Mise à jour de la section actuelle

        // Fin de l'animation
        setTimeout(() => {
            isAnimating = false; // Réactive le défilement
        }, 1000); // Durée totale de l'animation
    } else if (event.deltaY < 0 && currentSection === "accueil") {
        // Scroll vers le haut, retour à home
        isAnimating = true;
        document.querySelector('.accueil').style.opacity = '0';
        document.querySelector('.accueil').style.transform = 'translateY(100%)';

        document.querySelector('.home').style.opacity = '1';
        document.querySelector('.home').style.transform = 'translateY(0)';
        currentSection = "home";

        // Fin de l'animation
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }
});

// Événements pour les boutons de section
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (event) => {
        if (isAnimating) return;

        const targetSection = event.target.getAttribute('data-target');
        isAnimating = true;
        document.querySelector('.accueil').style.opacity = '0';
        document.querySelector('.accueil').style.transform = 'translateX(100%)';
        document.querySelector(`.${targetSection}`).style.opacity = '1';
        document.querySelector(`.${targetSection}`).style.transform = 'translateX(0)';
        currentSection = targetSection;

        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    });
});

// Événements pour les boutons de retour
document.querySelectorAll('.back-btn').forEach(button => {
    button.addEventListener('click', () => {
        if (isAnimating) return;

        isAnimating = true;
        document.querySelector(`.${currentSection}`).style.opacity = '0';
        document.querySelector(`.${currentSection}`).style.transform = 'translateX(-100%)';
        document.querySelector('.accueil').style.opacity = '1';
        document.querySelector('.accueil').style.transform = 'translateX(0)';
        currentSection = "accueil";

        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    });
});
