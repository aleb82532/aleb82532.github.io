// ================================================
//  CARTA VIRTUAL - script.js
// ================================================

// ── 1. PARTÍCULAS FLOTANTES DE FONDO ──────────────
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticle() {
  return {
    x:     Math.random() * canvas.width,
    y:     canvas.height + 20,
    size:  Math.random() * 8 + 4,
    speedY: Math.random() * 0.6 + 0.2,
    speedX: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.4 + 0.1,
    char:  Math.random() > 0.5 ? '♥' : '✿',
    color: Math.random() > 0.5 ? '#e8506a' : '#c9a96e',
  };
}

for (let i = 0; i < 18; i++) {
  const p = createParticle();
  p.y = Math.random() * canvas.height;
  particles.push(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle   = p.color;
    ctx.font        = p.size + 'px serif';
    ctx.fillText(p.char, p.x, p.y);
    p.y -= p.speedY;
    p.x += p.speedX;
    if (p.y < -20) { particles[i] = createParticle(); }
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}
animateParticles();


// ── 2. SECUENCIA DE INTRODUCCIÓN ──────────────────
const introScreen = document.getElementById('intro-screen');
const heartStage  = document.getElementById('heart-stage');
const letterPage  = document.getElementById('letter-page');

// Toque / clic en la pantalla de inicio
introScreen.addEventListener('click', startSequence);
introScreen.addEventListener('touchstart', startSequence, { passive: true });

let sequenceStarted = false;

function startSequence() {
  if (sequenceStarted) return;
  sequenceStarted = true;

  // 1) Desvanece pantalla de inicio
  introScreen.classList.add('fade-out');

  // 2) Muestra el escenario del corazón
  setTimeout(() => {
    heartStage.classList.add('visible');
    openHeart();
  }, 700);
}

// ── 3. ANIMACIÓN DEL CORAZÓN QUE SE ABRE ─────────
function openHeart() {
  const flaps = document.querySelectorAll('.flap');
  const inner = document.querySelector('.heart-inner');

  // Pequeña pausa dramática antes de abrir
  setTimeout(() => {
    flaps.forEach(f => f.classList.add('open'));
    inner.classList.add('revealed');
  }, 500);

  // Latido del corazón revelado por 1.5 s, luego transición a la carta
  setTimeout(() => {
    heartStage.classList.add('fade-out');
    setTimeout(showLetter, 800);
  }, 3200);
}

// ── 4. MOSTRAR LA CARTA ───────────────────────────
function showLetter() {
  letterPage.classList.add('visible');
  // Activa los párrafos que ya están en pantalla sin necesidad de scroll
  setTimeout(checkScroll, 400);
}

// ── 5. ANIMACIÓN DE PÁRRAFOS AL HACER SCROLL ──────
function checkScroll() {
  const items = document.querySelectorAll('.letter-paragraph, .letter-footer');
  const trigger = window.innerHeight * 0.92;

  items.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      el.classList.add('in-view');
    }
  });
}

window.addEventListener('scroll', checkScroll, { passive: true });
