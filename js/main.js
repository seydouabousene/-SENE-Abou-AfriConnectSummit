/* ============================ DARK MODE / LIGHT MODE============================= */
let darkModeBtn = document.getElementById('darkmode');
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        // toggle() ajoute la classe si elle n'y est pas, la retire si elle y est déjà
        document.body.classList.toggle('light-mode');
        // on change aussi l'icône du bouton pour que ce soit plus clair
        let estClair = document.body.classList.contains('light-mode');
        darkModeBtn.textContent = estClair ? '☀️' : '🌙';
    });
}

/* =====================FERMER LE MENU MOBILE QUAND ON CLIQUE SUR UN LIEN======================= */
let burgerBtn = document.querySelector('.burger');
let liensDuMenu = document.querySelectorAll('.navlien a');
liensDuMenu.forEach((lien) => {
    lien.addEventListener('click', () => {
        if (burgerBtn) {
            burgerBtn.classList.remove('open');
        }
    });
});


/* ========================BOUTON "RETOUR EN HAUT"=================================== */
let boutonsRH = document.querySelectorAll('[id="backToTop"]');
boutonsRH.forEach((bouton) => {
    bouton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


/* ======================== COMPTE À REBOURS EN TEMPS RÉEL========================== */
let dateConference = new Date('2026-03-12T09:00:00');
let elJours = document.getElementById('jours');
let elHeure = document.getElementById('heure');
let elMinutes = document.getElementById('minutes');
let elSecondes = document.getElementById('secondes');
function mettreAJourCompteARebours() {
    let maintenant = new Date();
    let difference = dateConference - maintenant; // résultat en millisecondes

    // si la date est déjà passée, on affiche 0 partout plutôt qu'un nombre négatif
    if (difference < 0) {
        difference = 0;
    }

    // 1000 ms = 1 seconde, 60 secondes = 1 minute, 60 minutes = 1 heure, 24h = 1 jour
    // Math.floor enleve la partie decimale
    let jours = Math.floor(difference / (1000 * 60 * 60 * 24));
    let heures = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let secondes = Math.floor((difference / 1000) % 60);

    // padStart(2, '0') transforme "9" en "09" pour toujours avoir 2 chiffres
    if (elJours) elJours.textContent = String(jours).padStart(2, '0');
    if (elHeure) elHeure.textContent = String(heures).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSecondes) elSecondes.textContent = String(secondes).padStart(2, '0');
}

// on lance une première fois immédiatement (sinon on voit "00:00:00:00" pendant 1 seconde)
mettreAJourCompteARebours();
// puis on répète toutes les 1000 ms (= 1 seconde)
setInterval(mettreAJourCompteARebours, 1000);


/* =================cOMPTEURS ANIMÉS AU SCROLL (section "En chiffres")================================= */

// comme id="chi" est répété 4 fois, on récupère les 4 avec querySelectorAll
let chiffresACompter = document.querySelectorAll('[id="chi"]');

function animerUnChiffre(element) {
    let texteOriginal = element.textContent.trim(); 
    let correspondance = texteOriginal.match(/^(\D*)(\d+)(\D*)$/); 
    // (regex) pour séparer le texte en trois parties :
    if (!correspondance) return; // sécurité : si jamais le texte ne contient pas de nombre

    let prefixe = correspondance[1];
    let cible = parseInt(correspondance[2], 10); 
    let suffixe = correspondance[3];

    let dureeAnimation = 1500; // 1.5 secondes
    let debut = performance.now();

    function etapeAnimation(maintenant) {
        let tempsEcoule = maintenant - debut;
        let progression = Math.min(tempsEcoule / dureeAnimation, 1); // entre 0 et 1
        let valeurActuelle = Math.floor(progression * cible);

        element.textContent = prefixe + valeurActuelle + suffixe;

        if (progression < 1) {
            requestAnimationFrame(etapeAnimation); // on continue l'animation
        } else {
            element.textContent = prefixe + cible + suffixe; // valeur finale exacte
        }
    }

    requestAnimationFrame(etapeAnimation);
}

// la section entière (#chicles) : quand ELLE devient visible, on anime les 4 chiffres d'un coup
let sectionChiffres = document.getElementById('chicles');

if (sectionChiffres && chiffresACompter.length > 0) {
    let observateurChiffres = new IntersectionObserver((entrees) => {
        entrees.forEach((entree) => {
            if (entree.isIntersecting) {
                chiffresACompter.forEach(animerUnChiffre);
                observateurChiffres.unobserve(entree.target); // on n'anime qu'une seule fois
            }
        });
    }, { threshold: 0.3 }); // se déclenche quand 30% de la section est visible

    observateurChiffres.observe(sectionChiffres);
}


/* ===============ANIMATION D'APPARITION AU SCROLL (section "Pourquoi participer")============================ */
let cartesWhy = document.querySelectorAll('.whycarte');

if (cartesWhy.length > 0) {
    let observateurWhy = new IntersectionObserver((entrees) => {
        entrees.forEach((entree) => {
            if (entree.isIntersecting) {
                entree.target.classList.add('visible');
                observateurWhy.unobserve(entree.target);
            }
        });
    }, { threshold: 0.2 });

    cartesWhy.forEach((carte) => observateurWhy.observe(carte));
}


/* ==========================ANNÉE DYNAMIQUE DANS LE FOOTER=============================== */
let elAnnee = document.getElementById('an');

if (elAnnee) {
    elAnnee.textContent = new Date().getFullYear();
}

/* ============ANIMATION D'APPARITION AU SCROLL — VERSION GÉNÉRIQUE (.reveal)============== */
let elementsReveal = document.querySelectorAll('.reveal');
if (elementsReveal.length > 0) {
    let observateurReveal = new IntersectionObserver((entrees) => {
        entrees.forEach((entree) => {
            if (entree.isIntersecting) {
                entree.target.classList.add('in-view');
                observateurReveal.unobserve(entree.target); // une seule fois suffit
            }
        });
    }, { threshold: 0.15 });

    elementsReveal.forEach((element) => observateurReveal.observe(element));
}


/* =====================ONGLETS JOUR 1 / JOUR 2 / JOUR 3 (page programme.html)====================== */
let boutonsOnglets = document.querySelectorAll('.tab-btn');
let panneauxOnglets = document.querySelectorAll('.tab-panel');

boutonsOnglets.forEach((bouton, index) => {
    bouton.addEventListener('click', () => {
        // étape 1 on retire "active" de tous les boutons...
        boutonsOnglets.forEach((b) => b.classList.remove('active'));
        // puis on le remet seulement sur celui qui vient d'être cliqué
        bouton.classList.add('active');

        // étape 2 même logique pour les panneaux, en utilisant le
        // même que le bouton cliqué
        panneauxOnglets.forEach((panneau) => panneau.classList.remove('active'));
        if (panneauxOnglets[index]) {
            panneauxOnglets[index].classList.add('active');
        }
    });
});


/* =====================FILTRE PAR THÉMATIQUE (page intervenants.html)======================== */
let boutonsFiltre = document.querySelectorAll('.filter-btn');
let cartesIntervenants = document.querySelectorAll('.coachcard');
let messageVide = document.getElementById('emptyState');

boutonsFiltre.forEach((bouton) => {
    bouton.addEventListener('click', () => {
        // étape 1 : mettre en évidence le bouton actif
        boutonsFiltre.forEach((b) => b.classList.remove('active'));
        bouton.classList.add('active');

        let filtreChoisi = bouton.dataset.filter; // ex : "business" ou "all"
        let nombreVisibles = 0;

        // étape 2 : montrer/cacher chaque carte selon sa thématique
        cartesIntervenants.forEach((carte) => {
            let correspond = filtreChoisi === 'all' || carte.dataset.category === filtreChoisi;
            carte.classList.toggle('hidden', !correspond);
            if (correspond) nombreVisibles++;
        });

        // étape 3 : afficher le message si le filtre ne donne aucun résultat
        if (messageVide) {
            messageVide.classList.toggle('show', nombreVisibles === 0);
        }
    });
});