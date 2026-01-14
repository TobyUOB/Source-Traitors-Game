const dice = document.getElementById('dice');
const diceNumber = document.getElementById('dice-number');
const qr = document.getElementById('qr');
const fire = document.getElementById('fire');

let rolled = false;

// Start ambient fire on first interaction
document.body.addEventListener('click', () => {
    fire.play().catch(()=>{});
}, { once:true });

// Initial glow
dice.classList.add('glow');

dice.addEventListener('click', () => {
    if (rolled) return;
    rolled = true;

    dice.classList.remove('glow');
    dice.classList.add('rolling');

    const roll = Math.floor(Math.random() * 20) + 1;

    setTimeout(() => {
    dice.classList.remove('rolling');

    // 🔥 FORCE MOBILE GPU RESET (critical)
    dice.style.filter = 'none';
    dice.style.transform = 'translateZ(0)';
    dice.getBoundingClientRect(); // <-- forces reflow

    // Next frame = clean state
    requestAnimationFrame(() => {
        dice.style.filter = '';
        dice.style.transform = '';
        dice.classList.add('glow');
    });

    diceNumber.textContent = roll;
    diceNumber.style.opacity = "1";

    qr.src = roll <= 10 ? "qr/prize1.png" : "qr/prize2.png";
    qr.style.display = "block";
}, 1000);
});
