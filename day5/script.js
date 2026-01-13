const dice = document.getElementById('dice');
const diceNumber = document.getElementById('dice-number');
const qr = document.getElementById('qr');
const fire = document.getElementById('fire');
const emberContainer = document.getElementById('embers');

let rolled = false;

// Start fire sound
fire.play().catch(()=>console.log("Autoplay prevented; will start on tap"));

// Start pulsing glow
dice.classList.add('glow');

dice.addEventListener('click', () => {
    if (rolled) return;
    rolled = true;

    // Remove glow, add rolling class
    dice.classList.remove('glow');
    dice.classList.add('rolling');

    // Random dice roll 1-20
    const roll = Math.floor(Math.random() * 20) + 1;

    // Show number overlay
    diceNumber.textContent = roll;
    diceNumber.style.color = '#fff';
    diceNumber.style.mixBlendMode = 'overlay';
    diceNumber.style.opacity = 1;

    // After animation, remove rolling & restore glow
    setTimeout(() => {
        dice.classList.remove('rolling');
        dice.classList.add('glow');

        // Show corresponding QR code
        qr.src = roll <= 10 ? 'qr/prize1.png' : 'qr/prize2.png';
        qr.style.display = 'block';

        // Ember burst
        createEmberBurst(diceNumber, 15);
    }, 1000);
});

// Ember burst helper
function createEmberBurst(element,count=12){
    for(let i=0;i<count;i++){
        const e = document.createElement('div');
        e.className='ember';
        const rect=element.getBoundingClientRect();
        e.style.left=rect.left+Math.random()*rect.width+'px';
        e.style.top=rect.top+Math.random()*rect.height+'px';
        e.style.animationDuration=2+Math.random()*2+'s';
        document.body.appendChild(e);
        setTimeout(()=>e.remove(),4000);
    }
}

// Ambient embers
for(let i=0;i<20;i++){
    const e=document.createElement('div');
    e.className='ember';
    e.style.left=Math.random()*100+'%';
    e.style.animationDelay=Math.random()*6+'s';
    emberContainer.appendChild(e);
}
