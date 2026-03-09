const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const menuOverlay = document.getElementById("menu-overlay");

if (menuToggle && navLinks && menuOverlay) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuOverlay.classList.toggle("show");
  });

  menuOverlay.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuOverlay.classList.remove("show");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuOverlay.classList.remove("show");
    });
  });
}

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-fr][data-pl]");

  elements.forEach((element) => {
    element.textContent = element.getAttribute(`data-${lang}`);
  });

  document.documentElement.lang = lang;
  localStorage.setItem("language", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("language") || "fr";
  setLanguage(savedLanguage);
});
