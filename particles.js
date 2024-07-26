const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleCount = 100; // number of particles
const particleSize = 2; // size of each particle
const particleColor = '#FFFFFF'; // color of each particle
let particles = [];
function createParticle() {
  const particle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 2 - 1, // random velocity X
    vy: Math.random() * 2 - 1, // random velocity Y
    size: particleSize,
    color: particleColor,
  };
  particles.push(particle);
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Check if the particle is out of bounds
    if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
      particles.splice(i, 1);
    }
  }
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  }
}

function loop() {
  requestAnimationFrame(loop);
  updateParticles();
  drawParticles();
}
for (let i = 0; i < particleCount; i++) {
  createParticle();
}
loop();
canvas.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX + window.scrollX;
  const mouseY = event.clientY + window.scrollY;
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    if (Math.sqrt(Math.pow(particle.x - mouseX, 2) + Math.pow(particle.y - mouseY, 2)) < particleSize * 2) {
      createParticle();
      break;
    }
  }
});
