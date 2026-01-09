// ---------------- UID Handling ----------------

// Try to get UID from the URL query string
let uid = new URLSearchParams(window.location.search).get("uid");

// If no UID from URL, check localStorage or generate a new random UID
if (!uid) {
    uid = localStorage.getItem("traitors_uid");
    if (!uid) {
        uid = crypto.randomUUID(); // generates random UID
        localStorage.setItem("traitors_uid", uid);
    }
}

// ---------------- Role Assignment ----------------

const TRAITOR_PERCENTAGE = 20; // Adjust the % of Traitors
const STORAGE_KEY = "traitors_role_" + uid;

// Deterministic SHA-256 hash to assign role
async function getRole(uid) {
    const msgBuffer = new TextEncoder().encode(uid);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashNumber = hashArray.reduce((a, b) => a + b, 0) % 100;
    return hashNumber < TRAITOR_PERCENTAGE ? "Traitor" : "Faithful";
}

// ---------------- Main Execution ----------------

(async () => {
    const roleDiv = document.getElementById("role");
    const qrImg = document.getElementById("qr");

    if (!roleDiv || !qrImg) {
        console.error("Required elements not found in HTML.");
        return;
    }

    // Get role from localStorage or compute it
    let role = localStorage.getItem(STORAGE_KEY);
    if (!role) {
        role = await getRole(uid);
        localStorage.setItem(STORAGE_KEY, role);
    }

    // Display role
    roleDiv.textContent = role;

    // Show correct QR code
    qrImg.src = role === "Traitor" ? "qr/traitor.png" : "qr/faithful.png";
})();
