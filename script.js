// tab switching
// tab switching
// 🎉 دالة لتشغيل الكونفيتي باستمرار في صفحة الترحيب فقط
let confettiRunning = false;
let confettiInterval;

function startConfettiLoop() {
  if (confettiRunning) return; // لو شغال بالفعل ميتكررش
  confettiRunning = true;

  confettiInterval = setInterval(() => {
    confetti({
      particleCount: 7,
      startVelocity: 25,
      spread: 360,
      ticks: 60,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
  }, 200); // كل 0.2 ثانية يرمي شوية كونفيتي
}

function stopConfettiLoop() {
  confettiRunning = false;
  clearInterval(confettiInterval);
}

// 🚀 لما الصفحة تفتح لأول مرة — شغّل الكونفيتي
window.addEventListener("load", startConfettiLoop);

// 🧁 لما المستخدم يدوس Enter — وقّف الكونفيتي وادخل على الصفحة التانية
document.getElementById("enter-btn").addEventListener("click", function() {
  const welcome = document.getElementById("welcome-screen");
  const mainPage = document.getElementById("main-page");

  // إخفاء شاشة الترحيب تدريجيًا
  welcome.style.opacity = "0";
  stopConfettiLoop(); // 🔇 وقف الكونفيتي هنا

  setTimeout(() => {
    welcome.style.display = "none";
    mainPage.style.display = "block";
  }, 1000);
});
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.tab;
    tabContents.forEach(c => {
      c.classList.remove('active');
      if (c.id === target) c.classList.add('active');
    });
  });
});
// ---- Lightbox Functionality with Next/Prev ----
const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

function showImage(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  currentIndex = index;
  lightboxImg.src = images[currentIndex].src;
}

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    showImage(index);
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showImage(currentIndex + 1);
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showImage(currentIndex - 1);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
// ---- Confetti Animation ----
const confettiCanvas = document.createElement('canvas');
confettiCanvas.id = 'confetti';
document.body.appendChild(confettiCanvas);

const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

const colors = ['#ff80ab', '#ffd54f', '#81d4fa', '#b388ff', '#69f0ae'];
const confettis = [];

for (let i = 0; i < 150; i++) {
  confettis.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 3,
    d: Math.random() * 50 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.floor(Math.random() * 10) - 10,
    tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
    tiltAngle: 0
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettis.forEach(confetti => {
    ctx.beginPath();
    ctx.lineWidth = confetti.r;
    ctx.strokeStyle = confetti.color;
    ctx.moveTo(confetti.x + confetti.tilt + confetti.r / 3, confetti.y);
    ctx.lineTo(confetti.x + confetti.tilt, confetti.y + confetti.tilt + confetti.r / 5);
    ctx.stroke();
  });
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confettis.forEach(confetti => {
    confetti.tiltAngle += confetti.tiltAngleIncremental;
    confetti.y += (Math.cos(confetti.d) + 3 + confetti.r / 2) / 2;
    confetti.x += Math.sin(confetti.d);
    confetti.tilt = Math.sin(confetti.tiltAngle - (confetti.d / 3)) * 15;

    if (confetti.y > confettiCanvas.height) {
      confetti.y = -10;
      confetti.x = Math.random() * confettiCanvas.width;
    }
  });
}


drawConfetti();
