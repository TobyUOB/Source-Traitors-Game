(function () {

  // ---------------- UID ----------------
  let uid = new URLSearchParams(window.location.search).get("uid");

  if (!uid) {
    uid = localStorage.getItem("traitors_uid");
    if (!uid) {
      uid = Math.random().toString(36).substring(2, 12);
      localStorage.setItem("traitors_uid", uid);
    }
  }

  // ---------------- Role ----------------
  const IMPOSTER_PERCENTAGE = 20;
  const STORAGE_KEY = "traitors_role_" + uid;

  let role = localStorage.getItem(STORAGE_KEY);

  if (!role) {
    role = Math.random() * 100 < IMPOSTER_PERCENTAGE ? "Imposter" : "Loyal";
    localStorage.setItem(STORAGE_KEY, role);
  }

  // ---------------- Elements ----------------
  const roleDiv = document.getElementById("role");
  const qrImg = document.getElementById("qr");
  const scroll = document.getElementById("scroll");

  if (!roleDiv || !qrImg || !scroll) {
    console.error("Required elements missing");
    return;
  }

  // ---------------- Scroll image fallback ----------------
  const imgTest = new Image();
  imgTest.src = "images/scroll.png";
  imgTest.onerror = function () {
    scroll.style.backgroundImage = "none";
  };

  // ---------------- Reveal ----------------
  scroll.addEventListener("click", function () {
    scroll.style.display = "none";
    roleDiv.style.display = "block";
    qrImg.style.display = "block";
    roleDiv.textContent = role;
    qrImg.src = role === "Imposter" ? "qr/imposter.png" : "qr/loyal.png";
  });

})();
