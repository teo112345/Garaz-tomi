document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  const topbar = document.querySelector(".topbar");

  if (menuBtn && nav) {
    const setMenuState = (isOpen) => {
      nav.classList.toggle("is-open", isOpen);
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute("aria-label", isOpen ? "Zamknij menu" : "Otwórz menu");
    };

    setMenuState(false);

    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      setMenuState(!isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          setMenuState(false);
        }
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNav = nav.contains(event.target);
      const clickedMenuBtn = menuBtn.contains(event.target);

      if (!clickedInsideNav && !clickedMenuBtn && nav.classList.contains("is-open")) {
        setMenuState(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (topbar) {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        topbar.style.background = "rgba(8,10,14,.92)";
        topbar.style.borderBottom = "1px solid rgba(255,255,255,.16)";
      } else {
        topbar.style.background = "rgba(8,10,14,.78)";
        topbar.style.borderBottom = "1px solid rgba(255,255,255,.12)";
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
  }
});
