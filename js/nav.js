// FIX 34: the menu button on small phones opens and closes the menu
const menuButton = document.querySelector(".menu-toggle");
const siteMenu = document.getElementById("site-menu");

if (menuButton && siteMenu) {
  menuButton.addEventListener("click", function () {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    siteMenu.classList.toggle("is-open", !isOpen);
  });

  // close it again with the Esc key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && siteMenu.classList.contains("is-open")) {
      menuButton.setAttribute("aria-expanded", "false");
      siteMenu.classList.remove("is-open");
      menuButton.focus();
    }
  });
}
