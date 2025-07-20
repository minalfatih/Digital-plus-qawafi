document.querySelector(".navbar-toggler").onclick = function () {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    document.querySelector("header .navbar-collapse").classList.add("active");
    document.querySelector("header .navbar-nav").classList.add("active");
  } else {
    document
      .querySelector("header .navbar-collapse")
      .classList.remove("active");
    document.querySelector("header .navbar-nav").classList.remove("active");
  }
};

const players = document.querySelectorAll(".audio-box");
let currentPlaying = null;

players.forEach((player, index) => {
  const audio = player.querySelector("audio");
  const playBtn = player.querySelector(".play-btn");
  const playPauseImg = playBtn.querySelector("img"); // **** هنا التغيير الأساسي ****
  const progressBar = player.querySelector(".progress-bar");
  const timeText = player.querySelector("small");

  audio.addEventListener("timeupdate", () => {
    const percent = audio.currentTime / audio.duration;
    const offset = 157 - percent * 157;
    progressBar.style.strokeDashoffset = offset;

    let curr = formatTime(audio.currentTime);
    let dur = formatTime(audio.duration);
    timeText.textContent = `${curr} / ${dur}`;
  });

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      if (currentPlaying && currentPlaying !== audio) {
        currentPlaying.pause();
    
        const prevPlayerBox = currentPlaying.closest(".audio-box");
        if (prevPlayerBox) {
            const prevPlayPauseImg = prevPlayerBox.querySelector(".play-btn img");
            if (prevPlayPauseImg) {
                prevPlayPauseImg.src = "./images/play-button-svgrepo-com.svg";
            }
        }
      }
      audio.play();
      currentPlaying = audio;
      playPauseImg.src = "./images/pause-svgrepo-com.svg"; // **** استخدام playPauseImg هنا ****
    } else {
      audio.pause();
      playPauseImg.src = "./images/play-button-svgrepo-com.svg"; // **** استخدام playPauseImg هنا ****
    }
  });

  audio.addEventListener("ended", () => {
    playPauseImg.src = "./images/play-button-svgrepo-com.svg"; // **** استخدام playPauseImg هنا ****
    progressBar.style.strokeDashoffset = 157;
    currentPlaying = null; // إعادة تعيين currentPlaying عند انتهاء الصوت
  });
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = Array.from(document.querySelectorAll('.carousel-slide'));
    const carouselDotsContainer = document.querySelector('.carousel-dots');
    const slideWidth = carouselSlides[0].offsetWidth; // عرض الشريحة الواحدة

    let currentIndex = 0;
    let autoScrollInterval;

    // إنشاء المؤشرات (النقاط) بناءً على عدد الشرائح
    function createDots() {
        carouselSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                moveToSlide(index);
            });
            carouselDotsContainer.appendChild(dot);
        });
    }

    // تحديث مكان الكاروسيل
    function updateCarouselPosition() {
        carouselTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        updateDots();
    }

    // تحديث المؤشرات النشطة
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // الانتقال إلى شريحة معينة
    function moveToSlide(index) {
        currentIndex = index;
        updateCarouselPosition();
        resetAutoScroll();
    }

    // الانتقال إلى الشريحة التالية
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselSlides.length;
        updateCarouselPosition();
    }

    // بدء التمرير التلقائي
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 3000); // 3 ثواني
    }

    // إعادة ضبط التمرير التلقائي (عند النقر اليدوي مثلاً)
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // تهيئة الكاروسيل
    createDots();
    startAutoScroll();

    // مهم: تحديث عرض الشريحة عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
        const newSlideWidth = carouselSlides[0].offsetWidth;
        carouselTrack.style.transform = `translateX(${-currentIndex * newSlideWidth}px)`;
    });
});

