const scroll = document.getElementById('scroll');
const scrollText = document.getElementById('scroll-text');
const qr = document.getElementById('qr');
const fire = document.getElementById('fire-sound');
const message = document.getElementById('result-message');

let revealed = false;

scroll.addEventListener('click', () => {
    if (revealed) return;
    revealed = true;

    // Play fire sound
    fire.play().catch(() => {});

    // Scroll bounce animation
    scroll.classList.add('bounce');
    setTimeout(() => scroll.classList.remove('bounce'), 600);

    // Random result
    const result = Math.random() < 0.5 ? "Loyal" : "Imposter";

    // Update scroll text
    scrollText.innerHTML = `<span>${result}</span>`;

    if (result === "Loyal") {
        message.textContent = "Your loyalty is rewarded";
        qr.src = "qr/day1.png";
        qr.style.display = "block";
    } else {
        message.textContent = "Hiding in plain sight eh... Check your app for more games & prizes throughout the week";
        qr.style.display = "none";
    }
});
