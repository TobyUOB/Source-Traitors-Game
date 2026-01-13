const characters = document.querySelectorAll('.character');
const reveal = document.getElementById('reveal');
const resultText = document.getElementById('result');
const qr = document.getElementById('qr');
const fire = document.getElementById('fire');
const emberContainer = document.getElementById('embers');

let locked = false;

// Random imposter
const imposterIndex = Math.floor(Math.random() * 3);

// Start fire sound
fire.play().catch(() => {});

// Character click handler
characters.forEach(char => {
    char.addEventListener('click', () => {
        if (locked) return;
        locked = true;

        const chosen = Number(char.dataset.id);

        // Fade out unselected characters
        characters.forEach(c => {
            if (c !== char) c.classList.add('fade');
        });

        // Scale selected
        char.classList.add('selected');

        const isImposter = chosen === imposterIndex;

        // Speech line
        const article = isImposter ? "an" : "a";
        typeText(`I am, and always have been ${article}...`, () => {
            revealResult(isImposter);
        });
    });
});

// Reveal result text and QR if needed
function revealResult(isImposter) {
    setTimeout(() => {
        const text = isImposter ? "IMPOSTER" : "LOYAL";
        resultText.textContent = text;
        resultText.style.display = "block";
        resultText.style.opacity = 0;
        fadeIn(resultText, 1, 1000); // fade-in glow over 1s

        // Bigger ember burst for Imposter, normal for Loyal
        createEmberBurst(resultText, isImposter ? 25 : 12);

        // Show QR if Imposter
        if (isImposter) qr.style.display = "block";
    }, 600);
}

// Simple typewriter effect
function typeText(text, callback) {
    reveal.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        reveal.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            callback();
        }
    }, 50);
}

// Create ember burst at element
function createEmberBurst(element, count=12) {
    for (let i = 0; i < count; i++) {
        const e = document.createElement('div');
        e.className = 'ember';
        const rect = element.getBoundingClientRect();
        e.style.left = rect.left + Math.random() * rect.width + 'px';
        e.style.top = rect.top + Math.random() * rect.height + 'px';
        e.style.animationDuration = 2 + Math.random() * 2 + 's';
        document.body.appendChild(e);
        setTimeout(() => e.remove(), 4000);
    }
}

// Fade-in utility
function fadeIn(el, targetOpacity=1, duration=1000) {
    let opacity = 0;
    const interval = 20;
    const increment = (targetOpacity / duration) * interval;
    const fade = setInterval(() => {
        opacity += increment;
        if (opacity >= targetOpacity) {
            opacity = targetOpacity;
            clearInterval(fade);
        }
        el.style.opacity = opacity;
    }, interval);
}

// Generate ambient background embers
for (let i = 0; i < 20; i++) {
    const e = document.createElement('div');
    e.className = 'ember';
    e.style.left = Math.random() * 100 + '%';
    e.style.animationDelay = Math.random() * 6 + 's';
    emberContainer.appendChild(e);
}
