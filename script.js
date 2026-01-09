const params = new URLSearchParams(window.location.search);
const uid = params.get("uid");

if (!uid) {
  document.body.innerHTML = "Invalid link.";
  throw new Error("No UID");
}

const TRAITOR_PERCENTAGE = 20;
const STORAGE_KEY = "traitors_role_" + uid;

// Deterministic hash-based roll
function hashToNumber(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 100;
}

let role = localStorage.getItem(STORAGE_KEY);

if (!role) {
  const roll = hashToNumber(uid);
  role = roll < TRAITOR_PERCENTAGE ? "Traitor" : "Faithful";
  localStorage.setItem(STORAGE_KEY, role);
}

document.getElementById("role").textContent = role;
document.getElementById("qr").src =
  role === "Traitor" ? "qr/traitor.png" : "qr/faithful.png";
