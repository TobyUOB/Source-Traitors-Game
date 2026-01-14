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

// Step 1: Fade in initial chalice
setTimeout(() => {
    initialChaliceWrapper.style.opacity = 1;

    // Step 2: Show candlelight + poison pour
    candlelight.style.opacity = 1;
    poison.style.opacity = 1;
    poison.style.transform = 'rotate(60deg)';

    setTimeout(() => {
        // Step 3: Fade out initial chalice + poison + candlelight
        initialChaliceWrapper.style.opacity = 0;
        poison.style.opacity = 0;
        poison.style.transform = 'rotate(0deg)';
        candlelight.style.opacity = 0;

        // Step 4: Fade in 3 chalices
        chalicesContainer.style.opacity = 1;
        candlelightHighlight(0);
    }, 1500);

}, 500);

// Candlelight “torch” highlight sequence
function candlelightHighlight(index){
    if(index >= chalices.length) return;

    const wrapper = chalices[index].parentElement;
    wrapper.classList.add('highlighted');

    setTimeout(()=>{
        wrapper.classList.remove('highlighted');
        candlelightHighlight(index + 1);
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

        // Scale selected
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
