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

// Step 2: Poison fade-in and pour
setTimeout(() => {
    const rect = chaliceBase.getBoundingClientRect();
    poison.style.left = rect.left + rect.width/2 - 40 + 'px';
    poison.style.top = rect.top - 80 + 'px';
    poison.style.opacity = 1;

    setTimeout(() => poison.style.transform = 'rotate(60deg)', 50);

    // Step 3: Fade out poison & initial chalice after pour
    setTimeout(() => {
        poison.style.opacity = 0;
        initialChaliceWrapper.style.opacity = 0;
    }, 2600);

}, 2000); // delay after chalice fade-in

// Step 4: Fade in 3 chalices after a short delay
setTimeout(() => {
    chalicesContainer.style.opacity = 1;
    startCandlelightSweep();
}, 5200);

// Continuous candlelight sweep
function startCandlelightSweep() {
    let index = 0;
    setInterval(() => {
        chalices.forEach((c, i) => {
            const wrapper = c.parentElement;
            if(!c.classList.contains('selected')) { // don't override selected chalice
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
        e.style.animationDuration = 2 + Math.random()*2 +*
