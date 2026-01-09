// --------------- UID Handling ---------------
// Try to get UID from query string
let uid = new URLSearchParams(window.location.search).get("uid");

// If no UID is provided, use localStorage or generate a new random UID
if (!uid) {
    uid = localStorage.getItem("traitors_uid");
    if (!uid) {
        uid = crypto.randomUUID(); // random unique UID
        localStorage.setItem("traitors_uid", uid);
    }
}

// --------------- Role Assignment ---------------
const TRAITOR_PERCENTAGE = 20; // Adjust this to change Traitor ratio
const STORAGE_KEY = "traitors_role_" + uid;

// Function: deterministic SHA-256 hash to assign role
async function getRole(uid) {
    // Hash the UID
    const msgBuffer = new TextEncoder().encode(uid);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Reduce hash to a number 0–99
    const hashNumber = hashArray.reduce((a, b) => a + b, 0) % 100;

    // Assign role based on percentage
    return hashNumber < TRAITOR_PERCENTAGE ? "Traitor" : "Faithful";
}

// --------------- Main Execution ---------------
(async () => {
    // Check localStorage first for consistency
    let role = localStorage.getItem(STORAGE_KEY);
    if (!role) {
        role = await getRole(uid);
        localStorage.setItem(STORAGE_KEY, role);
    }

    // Display role
    const roleDiv = document.getElementById("role");
    roleDiv.textContent = role;

    // Show correct QR code
    const qrImg = document.getElementById("qr");
    qrImg.src = role === "Traitor" ? "qr/traitor.png" : "qr/faithful.png";
})();
