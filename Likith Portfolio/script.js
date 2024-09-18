const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Resizing canvas to full window size
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Matrix characters
const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
const fontSize = 16;
const columns = canvas.width / fontSize; 
const drops = [];

// Initialize drops
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

// Draw characters
function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  
  // Update button text based on the current mode
  if (document.body.classList.contains('dark-mode')) {
    themeToggleBtn.textContent = 'Light Mode';
  } else {
    themeToggleBtn.textContent = 'Dark Mode';
  }
});

// Set initial mode based on user's preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
  themeToggleBtn.textContent = 'Light Mode';
} else {
  document.body.classList.add('light-mode');
  themeToggleBtn.textContent = 'Dark Mode';
}


setInterval(draw, 30);
