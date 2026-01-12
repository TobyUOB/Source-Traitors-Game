const scroll = document.getElementById("scroll");
const scrollText = document.getElementById("scroll-text");
const qr = document.getElementById("qr");
const embers = document.getElementById("embers");
const fire = document.getElementById("fire");

let revealed = false;

/* AMBIENT EMBERS */
function spawnEmber(intense=false){
    const e = document.createElement("div");
    e.className = "ember";
    e.style.left = Math.random()*100 + "%";
    e.style.bottom = "-10px";
    e.style.animationDuration = (intense ? 3 : 6 + Math.random()*6) + "s";
    embers.appendChild(e);
    setTimeout(()=>e.remove(), 12000);
}
setInterval(()=>spawnEmber(false), 350);

/* REVEAL FUNCTION */
scroll.addEventListener("click", ()=>{
    if(revealed) return;
    revealed = true;

    fire.play().catch(()=>{});

    // Ember burst on reveal
    for(let i=0;i<30;i++){ setTimeout(()=>spawnEmber(true), i*40); }

    // Random result
    const result = Math.random()<0.5 ? "Loyal" : "Imposter";
    scrollText.textContent = result;
    scrollText.classList.add("burn");

    // QR code
    qr.src = result==="Loyal"?"qr/loyal.png":"qr/imposter.png";
    qr.style.display="block";
});
