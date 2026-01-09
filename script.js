const scroll = document.getElementById('scroll');
const scrollText = document.getElementById('scroll-text');
const qr = document.getElementById('qr');

let revealed = false; // prevent multiple taps

scroll.addEventListener('click', () => {
    if (revealed) return;
    revealed = true;

    // Scroll bounce
    scroll.classList.add('bounce');
    setTimeout(() => scroll.classList.remove('bounce'), 600);

    // Random result
    const result = Math.random() < 0.5 ? "Loyal" : "Imposter";

    // Update scroll text
    scrollText.innerHTML = `<span>${result}</span>`;

    // Show QR from original folder
    qr.src = result === "Loyal" ? "qr/loyal.png" : "qr/imposter.png";
    qr.style.display = "block";
});
