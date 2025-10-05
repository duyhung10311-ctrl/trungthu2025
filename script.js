// === Starfield + Shooting Stars Effect ===
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let shootingStars = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

class ShootingStar {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height / 2;
        this.len = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.size = Math.random() * 1.5 + 0.5;
        this.angle = Math.PI / 4;
        this.color = 'white';
        this.opacity = 1;
        this.life = 0;
        this.maxLife = Math.random() * 80 + 50;
    }

    update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.life++;
        this.opacity = 1 - this.life / this.maxLife;

        if (this.life >= this.maxLife) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.len * Math.cos(this.angle), this.y - this.len * Math.sin(this.angle));
        ctx.stroke();
        ctx.restore();
    }
}

for (let i = 0; i < 5; i++) {
    shootingStars.push(new ShootingStar());
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let star of shootingStars) {
        star.update();
        star.draw();
    }

    requestAnimationFrame(animate);
}

animate();

// === Lantern + Wishes ===

const wishes = [
    "Trung thu vui vẻ nha cô gái, chúc em tối nay nhiều niềm vui, nhiều bánh, và nụ cười cũng tròn đầy như trăng vậy 🌕✨",
    "Chỉ mong đêm Trung Thu này em thấy lòng nhẹ hơn một chút, ngủ ngon hơn một chút, và bình an hơn một chút 🍃",
    "Mong em luôn giữ được nụ cười, dù cho có lúc mệt mỏi hay muốn bỏ cuộc. Vì với anh, nụ cười đó thật sự rất đặc biệt — nó khiến mọi thứ xung quanh trở nên đáng yêu hơn nhiều. 💛"
];

const images = [
    "img/avata1.jpg",
    "img/avata2.jpg",
    "img/avata3.jpg"
];

// === PHÁT NHẠC TƯƠNG THÍCH MỌI THIẾT BỊ ===
window.addEventListener("load", () => {
  const music = document.getElementById("bg-music");

  // Cố gắng phát khi load
  music.play().catch(() => {});

  // Khi người dùng chạm lần đầu (điện thoại)
  document.body.addEventListener(
    "touchstart",
    function () {
      music.play().catch(() => {});
    },
    { once: true }
  );

  // Khi người dùng click lần đầu (laptop)
  document.body.addEventListener(
    "click",
    function () {
      music.play().catch(() => {});
    },
    { once: true }
  );
});


// Hiện popup ảnh + lời chúc từng chữ và giữ popup 3 giây
function showWishPopup() {
    const popup = document.getElementById("wish-popup");

    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    const randomImg = images[Math.floor(Math.random() * images.length)];

    popup.innerHTML = `
        <img src="${randomImg}" alt="Wish Image" style="max-width: 100px; border-radius: 8px; margin-bottom: 10px;" />
        <div id="wish-text" style="font-size: 1.3rem; font-weight: 600; color: #d97706;"></div>
    `;

    popup.style.display = "block";

    const wishTextDiv = document.getElementById("wish-text");
    wishTextDiv.textContent = "";

    let index = 0;

    function typeWriter() {
        if (index < randomWish.length) {
            wishTextDiv.textContent += randomWish.charAt(index);
            index++;
            setTimeout(typeWriter, 60);
        } else {
            // ✅ Chờ 3 giây sau khi hiện xong chữ rồi mới ẩn popup
            setTimeout(() => {
                popup.style.display = "none";
            }, 3000);
        }
    }

    typeWriter();
}


// Tạo đèn lồng bay lên
function createLantern() {
    const lanternContainer = document.getElementById("lantern-container");
    const lantern = document.createElement("img");
    lantern.src = "den.png";
    lantern.className = "lantern";
    lantern.style.left = Math.random() * 90 + "%";
    lantern.style.transitionDuration = "8s";

    lanternContainer.appendChild(lantern);

    setTimeout(() => {
        lantern.style.transform = `translateY(-120vh) rotate(${Math.random() * 40 - 20}deg)`;
        lantern.style.opacity = "0";
    }, 100);

    setTimeout(() => {
        lantern.remove();
    }, 8500);

    lantern.addEventListener("click", (e) => {
        e.stopPropagation();
        showWishPopup();
    });
}

// Tạo 2 lồng đèn mỗi 700ms
setInterval(() => {
    createLantern();
    createLantern();
}, 700);


