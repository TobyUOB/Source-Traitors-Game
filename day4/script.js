const initialChaliceWrapper = document.getElementById('initialChaliceWrapper');
const chalicesContainer = document.getElementById('chalices');
const chalices = document.querySelectorAll('.chalice');
const poison = document.getElementById('poison');
const qr = document.getElementById('qr');
const message = document.getElementById('message');
const fire = document.getElementById('fire');
const emberContainer = document.getElementById('embers');

let locked = false;
let chalicesVisible = false;  // prevent early selection
let candleSweepInterval;

// Random poisoned chalice
const poisonedIndex = Math.floor(Math.random() * 3);

// Start fire sound
fire.play().catch(() => {});

// Generate ambient background embers
for (let i = 0; i < 20; i++) {
    const e = document.createElement('div');
    e.className = 'ember';
    e.style.left = Math.random() * 100 + '%';
    e.style.animationDelay = Math.random() * 6 + 's';
    emberContainer.appendChild(e);
}

// CINEMATIC SEQUENCE (~10s)
setTimeout(() => {
    // Step 1: Fade in initial chalice (0–2s)
    initialChaliceWrapper.style.transition = 'opacity 2s ease';
    initialChaliceWrapper.style.opacity = 1;

    // Step 2: Poison fade in (2–5s)
    setTimeout(() => {
        poison.style.position = 'absolute';
        poison.style.left = '50%';
        poison.style.top = '-70px'; // just above chalice
        poison.style.transform = 'translateX(-50%) rotate(0deg)';
        poison.style.opacity = 0;
        poison.style.transition = 'opacity 3s ease, transform 3s ease';
        poison.style.opacity = 1;
    }, 2000);

    // Step 3: Tilt to pour slowly (5–8s)
    setTimeout(() => {
        poison.style.transform = 'translateX(-50%) rotate(60deg)';
    }, 5000);

    // Step 4: Return upright and start fade out (8–9s)
    setTimeout(() => {
        poison.style.transform = 'translateX(-50%) rotate(0deg)';
        poison.style.transition = 'opacity 1s ease, transform 1s ease';
        poison.style.opacity = 0;
        initialChaliceWrapper.style.transition = 'opacity 1s ease';
        initialChaliceWrapper.style.opacity = 0;
    }, 8000);

    // Step 5: Fade in 3 chalices after cinematic pause (10s)
    setTimeout(() => {
        chalicesContainer.style.transition = 'opacity 1.5s ease';
        chalicesContainer.style.opacity = 1;
        chalicesVisible = true;
        startCandlelightSweep();
    }, 10000);

}, 500);
