/* --- 1. TOP BAR NAVIGATION PAGE SWITCHING --- */
const navItems = document.querySelectorAll('.nav-item');
const pageSections = document.querySelectorAll('.page-section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        navItems.forEach(nav => nav.classList.remove('active'));
        pageSections.forEach(page => page.classList.remove('active'));

        item.classList.add('active');
        const targetPage = item.getAttribute('data-page');
        const activeSection = document.getElementById(`page-${targetPage}`);

        if (activeSection) {
            activeSection.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


/* --- 2. FIRE & SPARK PARTICLES (MOUSE & TOUCH) --- */
const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 0.5) * 4 - 2;
        this.color = Math.random() > 0.5 ? '#00f0ff' : '#ff0055';
        this.life = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95;
        this.life -= 0.03;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function createParticles(x, y, count = 3) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y));
    }
}

window.addEventListener('mousemove', (e) => {
    createParticles(e.clientX, e.clientY, 2);
});

window.addEventListener('touchmove', (e) => {
    for (let touch of e.touches) {
        createParticles(touch.clientX, touch.clientY, 4);
    }
}, { passive: true });

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0 || particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();


/* --- 3. LOGIN & PASSWORD (12345678) AUTHENTICATION --- */
const loginModal = document.getElementById('loginModal');
const openLoginBtn = document.getElementById('openLoginBtn');
const closeLoginBtn = document.getElementById('closeLoginBtn');
const ctaBtn = document.getElementById('ctaBtn');
const loginForm = document.getElementById('loginForm');
const passInput = document.getElementById('passInput');
const errorMsg = document.getElementById('errorMsg');

function openModal() {
    loginModal.classList.add('active');
    passInput.value = '';
    errorMsg.style.display = 'none';
    passInput.focus();
}

function closeModal() {
    loginModal.classList.remove('active');
}

openLoginBtn.addEventListener('click', openModal);
ctaBtn.addEventListener('click', openModal);
closeLoginBtn.addEventListener('click', closeModal);

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal();
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = passInput.value.trim();

    if (password === '12345678') {
        alert('ACCESS GRANTED! Welcome to ASHEN GAMING HUB');
        closeModal();
        openLoginBtn.innerHTML = '<i class="fa-solid fa-user-check"></i> WELCOME';
        openLoginBtn.style.background = '#00f0ff';
        openLoginBtn.style.color = '#000';
    } else {
        errorMsg.style.display = 'block';
        passInput.value = '';
    }
});