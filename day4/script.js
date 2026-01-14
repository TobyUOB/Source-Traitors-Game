const initialChaliceWrapper = document.getElementById('initialChaliceWrapper');
const chaliceBase = document.getElementById('chaliceBase');
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

// Step 1: Fade in initial chalice slowly
setTimeout(() => {
    initialChaliceWrapper.style.opacity = 1;

    // Step 2: Poison bottle appear inside wrapper (relative positioning)
    poison.style.position = 'absolute';
    poison.style.left = '50%';
    poison.style.top = '-70px'; // just above chalice
    poison.style.transform = 'translateX(-50%) rotate(0deg)';
    poison.style.opacity = 1;

    // Step 2a: Tilt bottle to simulate pour
    setTimeout(() => {
        poison.style.transition = 'transform 2s ease';
        poison.style.transform = 'translateX(-50%) rotate(60deg)'; // pour
    }, 200);

    // Step 3: Return bottle upright and fade out after pouring
    setTimeout(() => {
        poison.style.transform = 'translateX(-50%) rotate(0deg)';
        poison.style.opacity = 0;
        initialChaliceWrapper.style.opacity = 0;
    }, 2500);

}, 500);

// Step 4: Fade in 3 chalices after longer cinematic pause
setTimeout(() => {
    chalicesContainer.style.opacity = 1;
    chalicesVisible = true; // allow selection now
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
        if(locked || !chalicesVisible) return;
        locked = true;

        // Stop candle sweep
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

// Create ember burst at element
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
