const heading = document.getElementById('heading');
const chaliceIntro = document.getElementById('chaliceIntro');
const poison = document.getElementById('poison');
const chalicesContainer = document.getElementById('chalices');
const chalices = document.querySelectorAll('.chalice');
const message = document.getElementById('message');
const qr = document.getElementById('qr');

let locked = false;
let sweepInterval;

// Random poisoned chalice
const poisonedIndex = Math.floor(Math.random() * 3);

// Typewriter
function typeText(text, cb){
    heading.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        heading.textContent += text[i];
        i++;
        if(i >= text.length){
            clearInterval(interval);
            cb && cb();
        }
    }, 80);
}

// Intro sequence
typeText("Earlier today...", () => {
    setTimeout(() => chaliceIntro.style.opacity = 1, 800);

    setTimeout(() => poison.style.opacity = 1, 2800);

    setTimeout(() => {
        poison.style.transform = "translateX(-50%) rotate(65deg)";
    }, 5200);

    setTimeout(() => {
        poison.style.opacity = 0;
        chaliceIntro.style.opacity = 0;
    }, 8200);

    setTimeout(() => {
        heading.style.opacity = 0;
        setTimeout(() => {
            heading.textContent = "Avoid the poisoned chalice";
            heading.style.opacity = 1;
        }, 600);

        chalicesContainer.style.opacity = 1;
        startSweep();
    }, 10400);
});

// Pulsing sweep animation
function startSweep(){
    let index = 0;
    sweepInterval = setInterval(() => {
        chalices.forEach(c => c.classList.remove('pulsing'));
        chalices[index].classList.add('pulsing');
        index = (index + 1) % chalices.length;
    }, 900);
}

// Selection
chalices.forEach(ch => {
    ch.addEventListener('click', () => {
        if(locked || chalicesContainer.style.opacity === "0") return;
        locked = true;

        clearInterval(sweepInterval);
        chalices.forEach(c => c.classList.remove('pulsing'));

        const chosen = Number(ch.dataset.id);

        chalices.forEach(c => { if(c !== ch) c.classList.add('fade'); });
        ch.classList.add('selected');

        setTimeout(() => {
            if(chosen === poisonedIndex){
                message.textContent = "Oh no! You drank from the
