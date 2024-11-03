document.addEventListener('DOMContentLoaded', function() {
    // Écrit au bout d'une seconde
    setTimeout(()=>{
        typeWriter();
    },1250)
    const header = document.querySelector('header');
    header.classList.add('visible');
    const accueilSection = document.querySelector('.accueil');
    accueilSection.classList.add('visible');
    const chevrons = document.querySelector('.chevrons');
    chevrons.classList.add('visible');
});

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Fonction pour afficher/masquer le menu
function toggleMenu() {
    if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navMenu.addEventListener('transitionend', () => {
            navMenu.style.display = 'none';
        }, { once: true });
    } else {
        navMenu.style.display = 'block';
        setTimeout(() => navMenu.classList.add('show'), 10);
    }
    menuToggle.classList.toggle('active'); // Animation du bouton hamburger
}

// Clic sur le bouton menu
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Empêche le clic de se propager au document
    toggleMenu();
});

// Ferme le menu en cliquant en dehors
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        if (navMenu.classList.contains('show')) {
            toggleMenu();
        }
    }
});


const phrases = [
    "Développeur web junior déterminé à progresser.",
    "Curieux, dévoué à l’expérience utilisateur.",
    "En quête d'un code toujours plus propre et optimisé."
];

// Variables pour le texte et les indices
let phraseIndex = 0;
let charIndex = 0;

const typedTextElement = document.getElementById("typed-text");

// Fonction pour afficher le texte avec effet de machine à écrire
function typeWriter() {
    if (charIndex < phrases[phraseIndex].length) {
        // Ajoute le caractère suivant à l'élément
        typedTextElement.textContent += phrases[phraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50); // Temps entre chaque caractère
    } else {
        // Pause après chaque phrase avant d'effacer
        setTimeout(eraseText, 1500);
    }
}

// Fonction pour effacer le texte
function eraseText() {
    if (charIndex > 0) {
        // Supprime le dernier caractère
        typedTextElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 25); // Temps entre chaque effacement de caractère
    } else {
        // Passe à la phrase suivante
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500); // Pause avant d'afficher la phrase suivante
    }
}

let currentSection = "accueil"; // Section actuelle
let isAnimating = false; // État d'animation

// Événement de défilement pour passer de accueil à menu
window.addEventListener('wheel', (event) => {
    // Ne rien faire si une animation est en cours
    if (isAnimating) return;

    if (event.deltaY > 0 && currentSection === "accueil") {
        // Scroll vers le bas, passer de accueil à menu
        isAnimating = true; // Début de l'animation
        document.querySelector('.accueil').style.opacity = '0'; // Rendre la section actuelle invisible
        document.querySelector('.accueil').style.transform = 'translateY(-100%)'; // Déplacer la section actuelle vers le haut
        document.querySelector('.menu').style.opacity = '1'; // Rendre la section d'menu visible
        document.querySelector('.menu').style.transform = 'translateY(0)'; // Remettre menu dans la vue
        currentSection = "menu"; // Mise à jour de la section actuelle

        // Fin de l'animation
        setTimeout(() => {
            isAnimating = false; // Réactive le défilement
        }, 1000); // Durée totale de l'animation
    } else if (event.deltaY < 0 && currentSection === "menu") {
        // Scroll vers le haut, retour à accueil
        isAnimating = true;
        document.querySelector('.menu').style.opacity = '0';
        document.querySelector('.menu').style.transform = 'translateY(100%)';

        document.querySelector('.accueil').style.opacity = '1';
        document.querySelector('.accueil').style.transform = 'translateY(0)';
        currentSection = "accueil";

        // Fin de l'animation
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }
});

// Événements pour les boutons de retour
document.querySelectorAll('.back-btn').forEach(button => {
    button.addEventListener('click', (event) => {

        isAnimating = true;
        document.querySelector(`.${currentSection}`).style.opacity = '0';
        document.querySelector(`.${currentSection}`).style.transform = 'translateY(100%)';
        document.querySelector('.menu').style.opacity = '1';
        document.querySelector('.menu').style.transform = 'translateY(0)';
        currentSection = "menu";

         // Fin de l'animation
         setTimeout(() => {
            isAnimating = false;
        }, 1000);
    });
});

let section1Visited = false //Annnule les animations si la section a été visité
let section2Visited = false
let section3Visited = false

// Événements pour les boutons de section
document.querySelectorAll('.menu button').forEach(button => {
    button.addEventListener('click', (event) => {

        const targetSection = event.target.getAttribute('data-target'); // Récupère la section à afficher
        isAnimating = true;
        document.querySelector('.menu').style.opacity = '0';
        document.querySelector('.menu').style.transform = 'translateY(-100%)';
        document.querySelector(`.${targetSection}`).style.opacity = '1';
        document.querySelector(`.${targetSection}`).style.transform = 'translateY(0)';
        currentSection = targetSection;

        if(currentSection === 'section-1'){
            setTimeout(() => {
                const imgCarousel = document.querySelector('.firstImg');
                imgCarousel.classList.add('visible');
                const descriptionCarousel = document.querySelector('.firstSlide');
                descriptionCarousel.classList.add('visible');
            }, 750);
            $(document).ready(function() {
                // Initialiser le slider principal
                $('.carousel').slick({
                    infinite: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    asNavFor: '.date-slider', // Synchronisation avec le slider de dates
                    arrows: true,
                    variableWidth: true
                });
            
                // Initialiser le slider de dates
                $('.date-slider').slick({
                    infinite: false,
                    slidesToShow: 5, // Afficher 3 dates en même temps
                    slidesToScroll: 1,
                    asNavFor: '.carousel', // Synchronisation avec le slider principal
                    centerMode: true, // Centrer l'élément sélectionné
                    focusOnSelect: true, // Sélection directe sur clic
                    arrows: false // Masquer les flèches de navigation pour les dates
                });
            });
        }

        if(currentSection === 'section-2'){
            //
        }


        // Lance les animations de la section 3
        if(currentSection === 'section-3' && !section3Visited){
            section3Visited = true;
            setTimeout(()=>{
                const progressBars = document.querySelectorAll(".progress-bar");
                const percentages = document.querySelectorAll(".percentage");

                progressBars.forEach((bar, index) => {
                    const percentage = parseInt(bar.getAttribute("data-percentage"));
                    let currentPercentage = 0;

                    // Anime la barre de progression
                    bar.style.width = percentage + "%";

                    // Animation du compteur
                    const interval = setInterval(() => {
                        if (currentPercentage >= percentage) {
                            clearInterval(interval);
                        } else {
                            currentPercentage++;
                            percentages[index].textContent = currentPercentage + "%";
                        }
                    }, 20); // Durée pour l'effet de compteur
                });
            }, 1500)
        }
    });
});
