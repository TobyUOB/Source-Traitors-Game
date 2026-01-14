const dice = document.getElementById('dice');
const diceBlur = document.getElementById('dice-blur');
const diceNumber = document.getElementById('dice-number');
const qr = document.getElementById('qr');
const embers = document.getElementById('embers');

let rolled = false;

// Ambient embers
for(let i=0;i<18;i++){
    const e = document.createElement('div');
    e.className='ember';
    e.style.left=Math.random()*100+'%';
    e.style.animationDelay=Math.random()*6+'s';
    embers.appendChild(e);
}

dice.addEventListener('click',()=>{
    if(rolled) return;
    rolled = true;

    dice.classList.remove('glow');
    dice.classList.add('rolling');
    diceBlur.classList.add('active');

    const roll = Math.floor(Math.random()*20)+1;

    setTimeout(()=>{
        dice.classList.remove('rolling');
        diceBlur.classList.remove('active');

        diceNumber.textContent = roll;
        diceNumber.style.opacity = '1';

        qr.src = roll<=10 ? 'qr/prize1.png' : 'qr/prize2.png';
        qr.style.display = 'block';

        burstEmbers(diceNumber,18);
    },1000);
});

function burstEmbers(el,count){
    const rect = el.getBoundingClientRect();
    for(let i=0;i<count;i++){
        const e = document.createElement('div');
        e.className='ember';
        e.style.left = rect.left + Math.random()*rect.width +'px';
        e.style.top = rect.top + Math.random()*rect.height +'px';
        e.style.animationDuration = '2s';
        document.body.appendChild(e);
        setTimeout(()=>e.remove(),2500);
    }
}
