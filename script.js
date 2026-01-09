const scroll = document.getElementById('scroll');
const scrollText = document.getElementById('scroll-text');
const qr = document.getElementById('qr');

let revealed = false; // flag to prevent multiple taps

scroll.addEventListener('click', () => {
    if (revealed) return; // ignore further taps
    revealed = true;       // mark as revealed

    // Bounce/unroll animation
    scroll.classList.add('bounce');
    setTimeout(() => scroll.classList.remove('bounce'), 600);

    // Random result
    const result = Math.random() < 0.5 ? "Loyal" : "Imposter";

    // Update scroll text only
    scrollText.innerHTML = `<span>${result}</span>`;

    // Show QR code (original folder path)
    qr.src = result === "Loyal" ? "qr/loyal.png" : "qr/imposter.png";
    qr.style.display = "block";
});
