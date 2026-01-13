const characters = document.querySelectorAll('.character');
const reveal = document.getElementById('reveal');
const resultText = document.getElementById('result');
const qr = document.getElementById('qr');
const fire = document.getElementById('fire');

let locked = false;

// Random imposter
const imposterIndex = Math.floor(Math.random() * 3);

fire.play().catch(()=>{});

characters.forEach(char => {
    char.addEventListener('click', () => {
        if (locked) return;
        locked = true;

        const chosen = Number(char.dataset.id);

        // Fade others
        characters.forEach(c => {
            if (c !== char) c.classList.add('fade');
        });

        char.classList.add('selected');

        typeText("I am, and always have been a...", () => {
            setTimeout(() => {
                const isImposter = chosen === imposterIndex;
                resultText.textContent = isImposter ? "IMPOSTER" : "LOYAL";
                resultText.style.display = "block";

                if (isImposter) {
                    qr.style.display = "block";
                }
            }, 600);
        });
    });
});

// Typewriter
function typeText(text, callback) {
    reveal.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        reveal.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            callback();
        }
    }, 50);
}

// Embers
const emberContainer = document.getElementById('embers');
for (let i=0;i<20;i++){
    const e=document.createElement('div');
    e.className='ember';
    e.style.left=Math.random()*100+'%';
    e.style.animationDelay=Math.random()*6+'s';
    emberContainer.appendChild(e);
}

