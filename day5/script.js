document.addEventListener('DOMContentLoaded', () => {

    const dice = document.getElementById('dice');
    const diceNumber = document.getElementById('dice-number');
    const qr = document.getElementById('qr');
    const fire = document.getElementById('fire');

    let rolled = false;

    dice.addEventListener('click', () => {
        if (rolled) return;
        rolled = true;

        fire.play().catch(()=>{});

        dice.classList.add('rolling');

        const roll = Math.floor(Math.random() * 20) + 1;

        setTimeout(() => {
            dice.classList.remove('rolling');

            // SHOW NUMBER (guaranteed)
            diceNumber.textContent = roll;
            diceNumber.style.opacity = '1';

            // QR only (no prize text)
            qr.src = roll <= 10 ? 'qr/prize1.png' : 'qr/prize2.png';
            qr.style.display = 'block';

            emberBurst();
        }, 1000);
    });

    function emberBurst(count = 14) {
        const rect = dice.getBoundingClientRect();

        for (let i = 0; i < count; i++) {
            const e = document.createElement('div');
            e.className = 'ember';
            e.style.left = rect.left + rect.width / 2 + 'px';
            e.style.top = rect.top + rect.height / 2 + 'px';
            e.style.animationDuration = 1.5 + Math.random() * 1.5 + 's';
            document.body.appendChild(e);
            setTimeout(() => e.remove(), 3000);
        }
    }

});
