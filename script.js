document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner toutes les images de la galerie
  const galleryImages = document.querySelectorAll(".gallery img");
  const videoContainers = document.querySelectorAll(".video-container");

  // Fonction pour gérer le zoom/dézoom des images
  function toggleZoom(img) {
    const isZoomed = img.classList.contains("zoomed");

    if (isZoomed) {
      img.style.transform = "scale(1)";
      img.style.zIndex = "";
      img.classList.remove("zoomed");
    } else {
      img.classList.add("zoomed");
      const rect = img.getBoundingClientRect();
      const offsetX = window.innerWidth / 2 - (rect.left + rect.width / 2);
      const offsetY = window.innerHeight / 2 - (rect.top + rect.height / 2);

      img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(2)`;
      img.style.zIndex = "1000";
      img.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      img.style.opacity = "1";
    }
  }

  // Ajouter un écouteur d'événements pour chaque image
  galleryImages.forEach((img) => {
    img.addEventListener("click", function (e) {
      e.stopPropagation(); // Empêcher la propagation de l'événement
      toggleZoom(this);
    });
  });

  // Gestion du clic hors des images pour les dézoomer
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".gallery img")) {
      galleryImages.forEach((img) => {
        if (img.classList.contains("zoomed")) {
          toggleZoom(img);
        }
      });
    }
  });

  // Gestion du menu hamburger
  const menuToggle = document.querySelector(".menu-toggle");
  const sideMenu = document.querySelector(".side-menu");

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("open");
    sideMenu.classList.toggle("open");
  });

  // Navigation latérale
  document.querySelectorAll(".side-menu-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      menuToggle.classList.remove("open");
      sideMenu.classList.remove("open");

      // Masquer toutes les sections
      document.querySelectorAll(".section").forEach((section) => {
        section.classList.remove("active");
      });
      const targetId = this.getAttribute("href").substring(1); // Supprimer le "#"
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.classList.add("active");
        targetSection.style.opacity = "0";
        targetSection.style.transform = "translateY(20px)";
        setTimeout(() => {
          targetSection.style.opacity = "1";
          targetSection.style.transform = "translateY(0)";
        }, 10);
      }
    });

    // Ajouter une animation de déplacement sur survol
    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateX(10px)";
    });
    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateX(0)";
    });
  });

  // Section par défaut active
  const defaultSection = document.querySelector("#profile");
  if (defaultSection) {
    defaultSection.classList.add("active");
    defaultSection.style.opacity = "0";
    defaultSection.style.transform = "translateY(20px)";
    setTimeout(() => {
      defaultSection.style.opacity = "1";
      defaultSection.style.transform = "translateY(0)";
    }, 10);
  }

  // Bouton pour retourner en haut de la page
  const backToTopButton = document.createElement("button");
  backToTopButton.className = "back-to-top";
  backToTopButton.innerHTML = "↑";
  document.body.appendChild(backToTopButton);

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", () => {
    backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
  });

  // Ajout du clignotement pour le logo GitHub
  const githubLogo = document.querySelector(".github-link img");
  if (githubLogo) {
    setInterval(() => {
      githubLogo.style.visibility =
        githubLogo.style.visibility === "hidden" ? "visible" : "hidden";
    }, 500); // Clignote toutes les 500ms
  }

  // Création du cercle de compétences
  const skills = [
    "Power BI",
    "Tableau",
    "SQL",
    "BigQuery",
    "PostgreSQL",
    "MySQL",
    "Python",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Stata",
    "R",
    "SAS",
    "LaTeX"
  ];

  const container = document.getElementById("skillsCircle");
  if (container) {
    const radius = 150; // Rayon du cercle

    skills.forEach((skill, index) => {
      const angle = index * (360 / skills.length) * (Math.PI / 180);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const skillElement = document.createElement("div");
      skillElement.className = "skill-item";
      skillElement.textContent = skill;
      skillElement.style.left = `calc(50% + ${x}px)`;
      skillElement.style.top = `calc(50% + ${y}px)`;
      skillElement.style.transform = "translate(-50%, -50%)";

      container.appendChild(skillElement);
    });
    container.style.animation = "rotate 30s linear infinite";
  }

  // Gestion des vidéos pour attendre le clic
  videoContainers.forEach((container) => {
    let iframe = container.querySelector("iframe");
    let playButton = document.createElement("div");

    playButton.className = "play-button";
    playButton.innerHTML = '<i class="fas fa-play-circle"></i>'; // Utilisez Font Awesome pour l'icône de lecture
    playButton.style.position = "absolute";
    playButton.style.top = "0";
    playButton.style.left = "0";
    playButton.style.width = "100%";
    playButton.style.height = "100%";
    playButton.style.background = "rgba(0,0,0,0.5)";
    playButton.style.display = "flex";
    playButton.style.justifyContent = "center";
    playButton.style.alignItems = "center";
    playButton.style.color = "white";
    playButton.style.fontSize = "4em";
    playButton.style.cursor = "pointer";
    container.appendChild(playButton);

    // Masquer l'iframe par défaut
    iframe.style.display = "none";

    playButton.addEventListener("click", function () {
      let videoSrc = iframe.getAttribute("data-src");
      if (videoSrc) {
        iframe.src = videoSrc;
        iframe.style.display = "block";
        this.style.display = "none"; // Cache le bouton play
      }
    });
  });
  // Machine à écrire pour le texte
  const text =
    "Diplômé en Ingénierie de données et évaluations économétriques, je suis un Data Analyst expérimenté spécialisé dans l'analyse prédictive et la visualisation avancée. Mon expertise couvre des outils tels que SQL, PYTHON, Google Cloud Platform et Power BI, me permettant de transformer des données brutes en insights stratégiques. Je mets en œuvre des solutions analytiques robustes tout en veillant à la conformité RGPD et en optimisant les processus ETL. Ma capacité à coordonner des projets complexes garantit des résultats précis et exploitables.";
  const typedTextElement = document.getElementById("typed-text");
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      typedTextElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, 30); // Ajustez la vitesse de frappe ici (en millisecondes)
    }
  }

  typeWriter();
});