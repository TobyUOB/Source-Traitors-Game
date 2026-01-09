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
  const roleDiv = document.getElementById("role");
  const qr = document.getElementById("qr");

  // Scroll image fallback
  const img = new Image();
  img.src = "images/scroll.png";
  img.onerror = () => {
    scroll.style.backgroundImage = "none";
    scroll.style.border = "2px solid white";
  };

  // Tap to reveal
  scroll.addEventListener("click", function () {

    // Update scroll
    scrollText.textContent = role;

    // Hide landing text
    landingText.style.display = "none";

    // Show role & QR
    roleDiv.style.display = "block";
    roleDiv.textContent = role;

    qr.style.display = "block";
    qr.src = role === "Imposter"
      ? "qr/imposter.png"
      : "qr/loyal.png";

    // Disable further clicks
    scroll.style.cursor = "default";
    scroll.removeEventListener("click", arguments.callee);
  });

})();
