const scroll = document.getElementById('scroll');
const scrollText = document.getElementById('scroll-text');
const qr = document.getElementById('qr');
const fire = document.getElementById('fire-sound');

let revealed = false;

scroll.addEventListener('click', () => {
    if (revealed) return;
    revealed = true;

    // Play fire sound
    fire.play().catch(() => console.log("Autoplay prevented; will start on user tap"));

    // Scroll bounce
    scroll.classList.add('bounce');
    setTimeout(() => scroll.classList.remove('bounce'), 600);

    // Random result
    const result = Math.random() < 0.5 ? "Loyal" : "Imposter";

    // Update scroll text
    scrollText.innerHTML = `<span>${result}</span>`;

    // Show QR code
    qr.src = result === "Loyal" ? "qr/loyal.png" : "qr/imposter.png";
    qr.style.display = "block";
});
