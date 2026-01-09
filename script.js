(async function() {
  // ---------------- UID Handling ----------------
  let uid = new URLSearchParams(window.location.search).get("uid");
  if (!uid) {
      uid = localStorage.getItem("traitors_uid");
      if (!uid) {
          uid = crypto.randomUUID();
          localStorage.setItem("traitors_uid", uid);
      }
  }

  // ---------------- Role Assignment ----------------
  const IMPOSTER_PERCENTAGE = 20; // chance to be Imposter
  const STORAGE_KEY = "traitors_role_" + uid;

  async function getRole(uid) {
      const msgBuffer = new TextEncoder().encode(uid);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashNumber = hashArray.reduce((a, b) => a + b, 0) % 100;
      return hashNumber < IMPOSTER_PERCENTAGE ? "Imposter" : "Loyal";
  }

  const roleDiv = document.getElementById("role");
  const qrImg = document.getElementById("qr");
  const scroll = document.getElementById("scroll");

  if (!roleDiv || !qrImg || !scroll) return;

  // ---------------- Get role ----------------
  let role = localStorage.getItem(STORAGE_KEY);
  if (!role) {
      role = await getRole(uid);
      localStorage.setItem(STORAGE_KEY, role);
  }

  // ---------------- Hide scroll if image fails ----------------
  const scrollImage = new Image();
  scrollImage.src = 'images/scroll.png';
  scrollImage.onerror = () => { scroll.style.display = 'none'; };

  // ---------------- Tap to reveal ----------------
  scroll.addEventListener("click", () => {
      scroll.style.display = "none";
      roleDiv.style.display = "block";
      qrImg.style.display = "block";
      qrImg.src = role === "Imposter" ? "qr/imposter.png" : "qr/loyal.png";
      roleDiv.textContent = role;
  });
})();
