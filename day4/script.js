const initialChaliceWrapper = document.getElementById('initialChaliceWrapper');
const chalicesContainer = document.getElementById('chalices');
const chalices = document.querySelectorAll('.chalice');
const poison = document.getElementById('poison');
const qr = document.getElementById('qr');
const message = document.getElementById('message');
const fire = document.getElementById('fire');
const emberContainer = document.getElementById('embers');

let locked = false;
let chalicesVisible = false;
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

// INITIAL STATE
initialChaliceWrapper.style.opacity = 0;
poison.style.opacity = 0;
poison.style.transformOrigin = 'top center';
poison.style.transform = 'translateX(-50%) rotate(0deg)';

// CINEMATIC SEQUENCE (~10s)
requestAnimationFrame(() => {
    // Step 1: fade in chalice
    initialChaliceWrapper.style.transition = 'opacity 2s ease';
    initialChaliceWrapper.style.opacity = 1;

    // Step 2: fade in poison
    setTimeout(() => {
        poison.style.opacity = 1;
    }, 2000);

    // Step 3: tilt to pour slowly
    setTimeout(() => {
        poison.style.transform = 'translateX(-50%) rotate(60deg)';
    }, 5000);

    // Step 4: return upright & fade out
    setTimeout(() => {
        poison.style.transform = 'translateX(-50%) rotate(0deg)';
        poison.style.opacity = 0;
        initialChaliceWrapper.style.opacity = 0;
    }, 8000);

    // Step 5: fade in 3 chalices
    setTimeout(() => {
        chalicesContainer.style.opacity = 1;
        chalicesVisible = true;
        startCandlelightSweep();
    }, 10000);
});

// Candlelight sweep
function startCandlelightSweep() {
    let index = 0;
    candleSweepInterval = setInterval(() => {
        chalices.forEach((c, i) => {
            const wrapper = c.parentElement;
            if(!c.classList.contains('selected')) {
                wrapper.classList.toggle('highlighted', i === index);
            }
        });
        index = (index + 1) % chalices.length;
    }, 600);
}

// Chalice click handler
chalices.forEach(ch => {
    ch.addEventListener('click', () => {
        if(locked || !chalicesVisible) return;
        locked = true;

        clearInterval(candleSweepInterval);
        chalices.forEach(c => c.parentElement.classList.remove('highlighted'));

        const chosen = Number(ch.dataset.id);

        chalices.forEach(c => { if(c !== ch) c.classList.add('fade'); });

        ch.classList.add('selected');

        createEmberBurst(ch, 20);

        setTimeout(() => {
            if(chosen === poisonedIndex){
                message.textContent = "Oh no! You drank from the poisoned chalice!";
            } else {
                qr.style.display = 'block';
            }
        }, 800);
    });
});

// Ember burst
function createEmberBurst(element,
