document.addEventListener('DOMContentLoaded', function() {
    // Écrit au bout d'une seconde
    setTimeout(()=>{
        typeWriter();
    },1250)
    // Affiche progressivement le heaeder, le titre et les chevrons
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

let startY = 0;
let isAnimating = false;
let currentSection = "accueil";

// Écouteurs pour l'événement wheel (pour les ordinateurs)
window.addEventListener('wheel', (event) => {
    if (isAnimating) return;

    if (event.deltaY > 0 && currentSection === "accueil") {
        scrollToMenu();
    } else if (event.deltaY < 0 && currentSection === "menu") {
        scrollToAccueil();
    }
});

// Gestion du balayage tactile pour mobile
window.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY; // Position initiale du doigt
});

window.addEventListener('touchmove', (event) => {
    if (isAnimating) return;

    const currentY = event.touches[0].clientY; // Position actuelle du doigt
    const deltaY = startY - currentY; // Différence de déplacement

    if (deltaY > 50 && currentSection === "accueil") {
        // Balayage vers le haut, aller à la section menu
        scrollToMenu();
    } else if (deltaY < -50 && currentSection === "menu") {
        // Balayage vers le bas, retour à la section accueil
        scrollToAccueil();
    }
});

function scrollToMenu() {
    isAnimating = true;
    document.querySelector('.accueil').style.opacity = '0';
    document.querySelector('.accueil').style.transform = 'translateY(-100%)';
    document.querySelector('.menu').style.opacity = '1';
    document.querySelector('.menu').style.transform = 'translateY(0)';
    currentSection = "menu";
    
    setTimeout(() => {
        isAnimating = false;
    }, 1000);
}

function scrollToAccueil() {
    isAnimating = true;
    document.querySelector('.menu').style.opacity = '0';
    document.querySelector('.menu').style.transform = 'translateY(100%)';
    document.querySelector('.accueil').style.opacity = '1';
    document.querySelector('.accueil').style.transform = 'translateY(0)';
    currentSection = "accueil";
    
    setTimeout(() => {
        isAnimating = false;
    }, 1000);
}


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

        if(currentSection === 'section-1' && !section1Visited){
            setTimeout(() => {
                const imgCarousel = document.querySelector('.firstImg');
                imgCarousel.classList.add('visible');
                const descriptionCarousel = document.querySelector('.firstSlide');
                descriptionCarousel.classList.add('visible');
            }, 650);
            $(document).ready(function() {
                // Initialise le slider principal
                $('.carousel').slick({
                    infinite: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    asNavFor: '.date-slider', // Synchronisation avec le slider de dates
                    arrows: true
                });
            
                // Initialise le slider de dates
                $('.date-slider').slick({
                    infinite: false,
                    slidesToShow: 5, // Affiche 5 dates en même temps
                    slidesToScroll: 1,
                    asNavFor: '.carousel', // Synchronisation avec le slider principal
                    centerMode: true, // Centre l'élément sélectionné
                    focusOnSelect: true, // Sélection directe sur clic
                    arrows: false, // Masque les flèches de navigation pour les dates
                    responsive: [
                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 3
                          }
                        }
                      ]
                });
            });
        }

        var paragraph = document.querySelector('.typer');
        var originalText = paragraph.innerHTML; // Enregistre le texte original une fois
        var textVisible = false; // Variable pour suivre l'état d'affichage du texte

        if (currentSection === 'section-2' && !section2Visited) {
            section2Visited = true;
            
            // Ne vide le texte que si c'est la première fois qu'on l'affiche
            if (!textVisible) {
                paragraph.innerHTML = ''; // Vide le contenu une seule fois
                textVisible = true; // Marque que l'animation a été jouée
            }

            function textEffect(animationName) {
                var words = originalText.split(' '); // Sépare le texte en mots
                var newText = '';

                // Crée une balise <i> autour de chaque mot
                for (var i = 0; i < words.length; i++) {
                    newText += '<i style="opacity: 0;">' + words[i] + '</i>'; // Initialisation avec opacité 0
                    if (i < words.length - 1) {
                        newText += ' '; // Ajoute un espace entre les mots
                    }
                }

                // Injecte le texte modifié dans le paragraphe
                paragraph.innerHTML = newText;

                // Récupère tous les mots enveloppés dans des balises <i>
                var wrappedWords = paragraph.getElementsByTagName('i');
                var wrappedWordsLen = wrappedWords.length;
                var j = 0;

                // Fonction d'ajout d'animation à chaque mot
                function addEffect() {
                    setTimeout(function () {
                        wrappedWords[j].className = animationName; // Applique la classe d'animation
                        wrappedWords[j].style.opacity = 1; // Rend le mot visible progressivement
                        j++;
                        if (j < wrappedWordsLen) {
                            addEffect(); // Continue jusqu'au dernier mot
                        }
                    }, 100); // Délai entre chaque mot
                }

                setTimeout(() => {
                    addEffect(); // Débute l'animation
                }, 500);
            }

            // Appele l'effet pour lancer l'animation
            textEffect('fly-in-out');
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
            }, 1000)
        }
    });
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
