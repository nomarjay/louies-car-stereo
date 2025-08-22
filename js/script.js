$(document).ready(function () {
  // nav menu
  const navbar = document.getElementById("navbar");
  const hamburgerMenu = document.getElementById("hamburger-menu");

  function openSidebar() {
    navbar.classList.add("show");
    console.log("clicked open");
    hamburgerMenu.setAttribute("aria-expanded", "true");
    navbar.removeAttribute("inert");
  }

  function closeSidebar() {
    navbar.classList.remove("show");
    console.log("clicked close");
    hamburgerMenu.setAttribute("aria-expanded", "false");
    navbar.setAttribute("inert", "");
  }

  // expose for inline onclick=""
  window.openSidebar = openSidebar;
  window.closeSidebar = closeSidebar;

  const media = window.matchMedia("(width < 700px)");
  media.addEventListener("change", (e) => updateNavbar(e));

  function updateNavbar(e) {
    const isMobile = e.matches;
    console.log(isMobile);
    if (isMobile) {
      navbar.setAttribute("inert", "");
    } else {
      // desktop device
      navbar.removeAttribute("inert");
    }
  }

  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
        link.addEventListener("click", () => {
        closeSidebar();
        });
    });

    updateNavbar(media);    
    
  // toggle button
  $(".toggleBtn").on("click", function () {
    $(this).siblings(".hide, .show").toggleClass("hide show");
  });
});