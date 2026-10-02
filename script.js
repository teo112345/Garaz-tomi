// ===== MENU MOBILE =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
  if (!navLinks) return;
  navLinks.classList.remove("open");
  if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
}

// ===== LANGUE FR / PL =====
const WA_NUMBER = "33759557233";
const WA_TEXT = {
  fr: "Bonjour, j'ai un problème avec mon utilitaire : ",
  pl: "Dzień dobry, mam problem z moim busem: ",
};

function setLanguage(lang) {
  if (lang !== "fr" && lang !== "pl") lang = "fr";

  document.querySelectorAll("[data-fr][data-pl]").forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
  document.querySelectorAll("[data-fr-alt]").forEach((el) => {
    el.setAttribute("alt", el.getAttribute(`data-${lang}-alt`));
  });
  document.querySelectorAll("[data-fr-aria]").forEach((el) => {
    el.setAttribute("aria-label", el.getAttribute(`data-${lang}-aria`));
  });
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.setAttribute("href", `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT[lang])}`);
  });
  const desc = document.querySelector('meta[name="description"]');
  if (desc && desc.dataset[lang]) desc.setAttribute("content", desc.dataset[lang]);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });

  document.documentElement.lang = lang;
  try { localStorage.setItem("language", lang); } catch (e) {}
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

(function initLanguage() {
  let saved = null;
  try { saved = localStorage.getItem("language"); } catch (e) {}
  const fromUrl = new URLSearchParams(location.search).get("lang");
  const fromBrowser = (navigator.language || "").toLowerCase().startsWith("pl") ? "pl" : "fr";
  setLanguage(fromUrl || saved || fromBrowser);
})();

// ===== GALERIE : AGRANDISSEMENT =====
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lbImg = lightbox.querySelector("img");
  const open = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lightbox.classList.add("open");
    lightbox.querySelector("button").focus();
  };
  const close = () => { lightbox.classList.remove("open"); lbImg.src = ""; };

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      open(item.dataset.full || img.currentSrc || img.src, img.alt);
    });
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); item.click(); }
    });
  });
  lightbox.addEventListener("click", (e) => { if (e.target !== lbImg) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

// ===== APPARITION AU SCROLL =====
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// ===== MENU ACTIF AU SCROLL (accueil) =====
const sections = document.querySelectorAll("main section[id]");
const anchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if (sections.length && anchorLinks.length && "IntersectionObserver" in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      anchorLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}

// ===== ANNÉE =====
document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
