const scroll = document.getElementById('scroll');
const scrollText = document.getElementById('scroll-text');
const qr = document.getElementById('qr');

scroll.addEventListener('click', () => {
    // Add bounce/unroll animation
    scroll.classList.add('bounce');
    setTimeout(() => {
        scroll.classList.remove('bounce');
    }, 600);

    // Random result
    const result = Math.random() < 0.5 ? "Loyal" : "Imposter";

    // Update scroll text only
    scrollText.innerHTML = `<span>${result}</span>`;

    // Show QR code below scroll
    qr.src = result === "Loyal" ? "images/loyal_qr.png" : "images/imposter_qr.png";
    qr.style.display = "block";
});
