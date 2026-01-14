const dice = document.getElementById('dice');
const diceBlur = document.getElementById('dice-blur');
const diceNumber = document.getElementById('dice-number');
const qr = document.getElementById('qr');
const fire = document.getElementById('fire');

let rolled = false;

// Start with glow
dice.classList.add('glow');

dice.addEventListener('click', () => {
    if (rolled) return;
    rolled = true;

    fire.play().catch(()=>{});

    // Start roll visuals
    dice.classList.remove('glow');
    dice.classList.add('rolling');
    diceBlur.classList.add('active');

    const roll = Math.floor(Math.random() * 20) + 1;

    setTimeout(() => {
        // Stop roll visuals
        dice.classList.remove('rolling');
        diceBlur.classList.remove('active');

        // Restore glow
        dice.classList.add('glow');

        // Reveal number
        diceNumber.textContent = roll;
        diceNumber.style.opacity = "1";

        // Show QR
        qr.src = roll <= 10 ? "qr/prize1.png" : "qr/prize2.png";
        qr.style.display = "block";
    }, 1000);
});
