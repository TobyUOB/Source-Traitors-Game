const initialChaliceWrapper = document.getElementById('initialChaliceWrapper');
const chalicesWrapper = document.getElementById('chalicesWrapper');
const chalices = document.querySelectorAll('.chalice');
const poison = document.getElementById('poison');
const qr = document.getElementById('qr');
const message = document.getElementById('message');
const emberContainer = document.getElementById('embers');
const chaliceGlow = document.getElementById('chaliceGlow');

let locked = false;
let chalicesVisible = false;
let candleSweepInterval;

// Random poisoned chalice
const poisonedIndex = Math.floor(Math.random() * 3);

// Generate ambient background embers
for (let i = 0; i < 20; i++) {
    const e = document.createElement('div');
    e.className = 'ember';
    e.style.left = Math.random() * 100 + '%';
    e.style.animationDelay = Math.random() * 6 + 's';
    emberContainer.appendChild(e);
}

// Start cinematic after short delay
setTimeout(() => runCinematic(), 50);

function runCinematic() {
    initialChaliceWrapper.style.opacity = 0;
    poison.style.opacity = 0;
    poison.style.transform = 'translateX(-50%) rotate(0deg)';

    // fade in chalice
    setTimeout(() => initialChaliceWrapper.style.opacity = 1, 50);

    // fade in poison
    setTimeout(() => poison.style.opacity = 1, 2050);

    // tilt to pour slowly
    setTimeout(() => poison.style.transform = 'translateX(-50%) rotate(60deg)', 5050);

    // fade out poison & chalice
    setTimeout(() => {
        poison.style.transform = 'translateX(-50%) rotate(0deg)';
        poison.style.opacity = 0;
        initialChaliceWrapper.style.opacity = 0;
    }, 8050);

    // fade in 3 chalices
    setTimeout(() => {
        chalicesWrapper.style.opacity = 1;
        chalicesVisible = true;
        startCandlelightSweep();
    }, 10050);
}

// Candlelight sweep - move glow behind each chalice
function startCandlelightSweep() {
    let index = 0;
    candleSweepInterval = setInterval(() => {
        if (locked) return;
        const chal = chalices[index];
        const rect = chal.getBoundingClientRect();
        const containerRect = chalicesWrapper.getBoundingClientRect();
        chaliceGlow.style.left = (rect.left - containerRect.left + rect.width/2) + 'px';
        chaliceGlow.style.top  = (rect.top - containerRect.top + rect.height/2) + 'px';
        chaliceGlow.style.opacity = 1;
        index = (index + 1) % chalices.length;
    }, 600);
}

// Chalice selection
chalices.forEach(ch => {
    ch.addEventListener('click', () => {
        if(locked || !chalicesVisible) return;
        locked = true;

        clearInterval(candleSweepInterval);
        chaliceGlow.style.opacity = 0;

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
