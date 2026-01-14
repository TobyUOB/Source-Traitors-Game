const initialChaliceWrapper = document.getElementById('initialChaliceWrapper');
const chaliceBase = document.getElementById('chaliceBase');
const chalicesContainer = document.getElementById('chalices');
const chalices = document.querySelectorAll('.chalice');
const poison = document.getElementById('poison');
const candlelight = document.getElementById('candlelight');
const qr = document.getElementById('qr');
const message = document.getElementById('message');
const fire = document.getElementById('fire');
const emberContainer = document.getElementById('embers');

let locked = false;
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

// Step 1: Fade in initial chalice slowly
setTimeout(() => {
    initialChaliceWrapper.style.opacity = 1;
}, 500);

// Step 2: Poison fade-in and tilt (no stream)
setTimeout(() => {
    const wrapperRect = initialChaliceWrapper.getBoundingClientRect();

    poison.style.left = (wrapperRect.left + wrapperRect.width/2 - poison.offsetWidth/2) + 'px';
    poison.style.top = (wrapperRect.top - poison.offsetHeight + window.scrollY) + 'px';
    poison.style.opacity = 1;

    // Tilt the bottle to suggest pouring
    setTimeout(() => {
        poison.style.transform = 'rotate(60deg)';
    }, 50);

    // Step 3: Fade out poison & initial chalice after pouring (~3s)
    setTimeout(() => {
        poison.style.opacity = 0;
        initialChaliceWrapper.style.opacity = 0;
    }, 3000);

}, 2000);

// Step 4: Fade in 3 chalices after longer delay
setTimeout(() => {
    chalicesContainer.style.opacity = 1;
    startCandlelightSweep();
}, 5500);

// Continuous candlelight sweep over 3 chalices
function startCandlelightSweep() {
    let index = 0;
    candleSweepInterval = setInterval(() => {
        chalices.forEach((c, i) => {
            const wrapper = c.parentElement;
            if(!c.classList.contains('selected')) {
                if(i === index) wrapper.classList.add('highlighted');
                else wrapper.classList.remove('highlighted');
            }
        });
        index = (index + 1) % chalices.length;
    }, 600);
}

// Chalice click handler
chalices.forEach(ch => {
    ch.addEventListener('click', () => {
        if(locked) return;
        locked = true;

        // Stop candle sweep
        clearInterval(candleSweepInterval);
        chalice
