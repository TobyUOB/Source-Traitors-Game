(function () {

  // UID
  let uid = new URLSearchParams(window.location.search).get("uid");
  if (!uid) {
    uid = localStorage.getItem("traitors_uid");
    if (!uid) {
      uid = Math.random().toString(36).substring(2, 12);
      localStorage.setItem("traitors_uid", uid);
    }
  }

  // Role
  const IMPOSTER_PERCENTAGE = 20;
  const STORAGE_KEY = "traitors_role_" + uid;

  let role = localStorage.getItem(STORAGE_KEY);
  if (!role) {
    role = Math.random() * 100 < IMPOSTER_PERCENTAGE ? "Imposter" : "Loyal";
    localStorage.setItem(STORAGE_KEY, role);
  }

  // Elements
  const landingText = document.getElementById("landing-text");
  const scroll = document.getElementById("scroll");
  const scrollText = document.getElementById("scroll-text");
  const qr = document.getElementById("qr");

  if (!scroll || !scrollText || !qr) return;

  // Scroll image fallback
  const img = new Image();
  img.src = "images/scroll.png";
  img.onerror = function () {
    scroll.style.backgroundImage = "none";
    scroll.style.border = "2px solid white";
  };

  // Reveal
  scroll.addEventListener("click", function reveal() {

    // Hide landing text
    if (landingText) landingText.style.display = "none";

    // Update scroll text
    scrollText.textContent = role;

    // Enable torch sweep
    scroll.classList.add("revealed");

    // Show QR
    qr.style.display = "block";
    qr.src = role === "Imposter"
      ? "qr/imposter.png"
      : "qr/loyal.png";

    scroll.style.cursor = "default";
    scroll.removeEventListener("click", reveal);
  });

})();
