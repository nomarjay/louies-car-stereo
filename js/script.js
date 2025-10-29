// script.js (full replacement)
// Requires jQuery loaded before this file.

$(function () {
  // --- cache DOM ---
  const $navbar = $("#navbar"); // your main/off-canvas nav
  const $hamburger = $("#hamburger-menu"); // button that opens/closes nav
  const $closeBtn = $("#close-hamburger"); // optional explicit close button
  const $overlay = $("#overlay"); // full-screen dimmer (optional)
  const $doc = $(document);
  const $body = $("body");

  // Safety: if HTML left it behind, make sure nav is always clickable
  $navbar.removeAttr("inert");

  // --- sidebar controls ---
  function openSidebar() {
    $navbar.addClass("show");
    $overlay.addClass("show");
    $body.addClass("nav-open");
    $hamburger.attr("aria-expanded", "true");
    // never use 'inert' on the navbar — it disables all clicks inside it
  }

  function closeSidebar() {
    $navbar.removeClass("show");
    $overlay.removeClass("show");
    $body.removeClass("nav-open");
    $hamburger.attr("aria-expanded", "false");
  }

  function toggleSidebar() {
    if ($navbar.hasClass("show")) closeSidebar();
    else openSidebar();
  }

  // Expose for any inline onclick=""
  window.openSidebar = openSidebar;
  window.closeSidebar = closeSidebar;

  // --- bindings ---
  // Open/close via hamburger/close buttons
  $hamburger.on("click", function (e) {
    // console.log("hamburger clicked")
    e.preventDefault();
    openSidebar();
  });
  $closeBtn.on("click", function (e) {
    e.preventDefault();
    closeSidebar();
  });

  // Clicking the dim overlay closes the sidebar (if overlay exists)
  $overlay.on("click", closeSidebar);

  // Any click on a link in the main navbar closes it (use event delegation)
  $navbar.on("click", "a", closeSidebar);

  // Also close when following in-page hash links anywhere on the page
  $doc.on("click", 'a[href^="#"]', closeSidebar);

  // Close on ESC key
  $doc.on("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });

  // If the Services page is swapping content via HTMX, make sure swaps never
  // leave the overlay/nav in a blocking state
  $doc.on("htmx:afterOnLoad htmx:afterSwap", closeSidebar);

  // --- Services mini-nav (scope any custom handlers here only) ---
  // If your services mini-nav uses hx-get on the <a> tags, you typically
  // don't need JS below. Keeping this here in case you ever wire custom logic.
  $("#services-mini-nav").on("click", "a", function (_e) {
    // Example (not needed when using hx-get directly):
    // _e.preventDefault();
    // htmx.ajax('GET', $(this).attr('href'), '#services-content');
  });

  // --- your existing toggle button behavior ---
  // (e.g., for showing/hiding extra sections)
  $(".toggleBtn").on("click", function () {
    $(this).siblings(".hide, .show").toggleClass("hide show");
  });
});
