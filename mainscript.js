function toggleAboutUs() {
  document.getElementById("aboutUsDropdown").classList.toggle("hidden");
}

function toggleMissionSubItems() {
  document.getElementById("missionSubItems").classList.toggle("hidden");
}

// Optional: Close dropdowns on outside click
document.addEventListener('click', function (event) {
  const aboutUs = document.getElementById("aboutUsDropdown");
  const mission = document.getElementById("missionSubItems");

  if (!event.target.closest("li.relative")) {
    aboutUs?.classList.add("hidden");
    mission?.classList.add("hidden");
  }
});


const slider = document.getElementById("slider");

// Duplicate ONLY the inner items
const items = Array.from(slider.children);
items.forEach(item => {
  const clone = item.cloneNode(true);
  slider.appendChild(clone);
});

let scrollAmount = 0;

function animateSlider() {
  scrollAmount += 1; // Change speed if needed
  if (scrollAmount >= slider.scrollWidth / 2) {
    scrollAmount = 0;
  }
  slider.scrollLeft = scrollAmount;
  requestAnimationFrame(animateSlider);
}

animateSlider();

function setupInfiniteRightSlider(sliderId, direction = 'right', speed = 0.5) {
  const wrapper = document.getElementById(sliderId);
  const track = wrapper.querySelector('.slider-track');

  // Clone items to allow seamless loop
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollPos = 0;

  function animate() {
    scrollPos += (direction === 'right' ? speed : -speed);

    // Reset scroll when halfway through (seamless loop)
    if (Math.abs(scrollPos) >= track.scrollWidth / 2) {
      scrollPos = 0;
    }

    wrapper.scrollLeft = scrollPos;
    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize both sliders
setupInfiniteRightSlider('slider1', 'right', 0.4); // scroll left-to-right


function setupInfiniteLeftSlider(sliderId, direction = 'left', speed = 0.5) {
  const wrapper = document.getElementById(sliderId);
  const track = wrapper.querySelector('.slider-track');

  // Clone items to allow seamless loop
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollPos = 0;

  function animate() {
    scrollPos += (direction === 'left' ? speed : -speed);

    // Reset scroll when halfway through (seamless loop)
    if (Math.abs(scrollPos) >= track.scrollWidth / 2) {
      scrollPos = 0;
    }

    wrapper.scrollLeft = scrollPos;
    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize both sliders
setupInfiniteLeftSlider('slider2', 'left', 0.4); // scroll left-to-right


const sliderImages = [
  "assests/herothree.jpeg",
  "assests/heroone.png",
  "assests/herotwo.png",
  "assests/herothree.png",
];

let currentIndex = 0;
const heroSlider = document.getElementById("heroSlider");
const dots = document.querySelectorAll("#heroDots .dot");

// Function to update background and active dot
function updateSlider(index) {
  currentIndex = index;
  heroSlider.style.backgroundImage = `url('${sliderImages[currentIndex]}')`;
  updateDots();
}

// Function to highlight active dot
function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.remove("opacity-100");
    dot.classList.add("opacity-50");
    if (i === currentIndex) {
      dot.classList.remove("opacity-50");
      dot.classList.add("opacity-100");
    }
  });
}

// Auto-change every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % sliderImages.length;
  updateSlider(currentIndex);
}, 5000);

// Allow click on dots to switch slides
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    updateSlider(i);
  });
});

// Init first image and dot
updateSlider(0);


document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % sliderImages.length;
  updateSlider(currentIndex); // use your existing function
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
  updateSlider(currentIndex); // use your existing function
});


function animateCountUp(el) {
  const target = +el.getAttribute('data-target');
  const duration = 2000; // total duration in ms
  const frameRate = 30;  // updates per second
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const current = Math.round(target * progress);

    el.textContent = current + '+';

    if (frame === totalFrames) {
      clearInterval(counter);
      el.textContent = target + '+';
    }
  }, 1000 / frameRate);
}

// Observer to trigger animation on scroll into view
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCountUp(el);
      observer.unobserve(el); // Only trigger once
    }
  });
}, { threshold: 0.6 });

// Observe all .count-up elements
document.querySelectorAll('.count-up').forEach(el => {
  observer.observe(el);
});