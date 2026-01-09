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
  const TRAITOR_PERCENTAGE = 20;
  const STORAGE_KEY = "traitors_role_" + uid;

  async function getRole(uid) {
      const msgBuffer = new TextEncoder().encode(uid);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashNumber = hashArray.reduce((a, b) => a + b, 0) % 100;
      return hashNumber < TRAITOR_PERCENTAGE ? "Traitor" : "Faithful";
  }

  // ---------------- Main Execution ----------------
  const roleDiv = document.getElementById("role");
  const qrImg = document.getElementById("qr");

  if (!roleDiv || !qrImg) return;

  let role = localStorage.getItem(STORAGE_KEY);
  if (!role) {
      role = await getRole(uid);
      localStorage.setItem(STORAGE_KEY, role);
  }

  roleDiv.textContent = role;
  qrImg.src = role === "Traitor" ? "qr/traitor.png" : "qr/faithful.png";

})();
