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
initialChaliceWrapper.style.transition = 'opacity 2s ease';

poison.style.opacity = 0;
poison.style.transition = 'opacity 3s ease, transform 3s ease';
poison.style.transformOrigin = 'top center';
poison.style.transform = 'translateX(-50%) rotate(0deg)';

// CINEMATIC SEQUENCE (~10s)
requestAnimationFrame(() => {
    // Step 1: Fade in initial chalice (0–2s)
    initialChaliceWrapper.style.opacity = 1;

    // Step 2: Fade in poison bottle (2–5s)
    setTimeout(() => {
        poison.style.opacity = 1;
    }, 2000);

    // Step 3: Tilt to pour slowly (5–8s)
    setTimeout(() => {
        poison.style.transform = 'translateX(-50%) rotate(60deg)';
    }, 5000);

    // Step 4: Return upright and fade out (8–9s)
    setTimeout(() => {
        poison.style.transform = 'translateX(-50%) rotate(0deg)';
        poison.style.opacity = 0;
        initialChaliceWrapper.style.opacity = 0;
    }, 8000);

    // Step 5: Fade in 3 chalices (10s)
    setTimeout(() => {
        chalicesContainer.style.transition = 'opacity 1.5s ease';
        chalicesContainer.style.opacity = 1;
        chalicesVisible = true;
        startCandlelightSweep();
    }, 10000);
});

// Candlelight sweep over chalices
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
        if(locked || !chalicesVisible) return;
        locked = true;

        // Stop candle sweep and remove highlights
        clearInterval(candleSweepInterval);
        chalices.forEach(c => c.parentElement.classList.remove('highlighted'));

        const chosen = Number(ch.dataset.id);

        // Fade out unselected
        chalices.forEach(c => { if(c !== ch) c.classList.add('fade'); });

        // Scale & breathing glow on selected
        ch.classList.add('selected');

        // Ember burst
        createEmberBurst(ch, 20);

        // Reveal message or QR
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
function createEmberBurst(element, count=12){
    for(let i=0;i<count;i++){
        const e = document.createElement('div');
        e.className='ember';
        const rect = element.getBoundingClientRect();
        e.style.left = rect.left + Math.random()*rect.width + 'px';
        e.style.top = rect.top + Math.random()*rect.height + 'px';
        e.style.animationDuration = 2 + Math.random()*2 + 's';
        document.body.appendChild(e);
        setTimeout(()=>e.remove(),4000);
    }
}
