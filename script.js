// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ===== Gold thread draws with scroll =====
const threadPath = document.getElementById('threadPath');
const pathLength = threadPath.getTotalLength();
threadPath.style.strokeDasharray = pathLength;
threadPath.style.strokeDashoffset = pathLength;

function updateThread() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollTop / docHeight, 1);
  const offset = pathLength - progress * pathLength;
  threadPath.style.strokeDashoffset = offset;
}
window.addEventListener('scroll', updateThread, { passive: true });
updateThread();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Testimonial rotation =====
const testimonials = [
  {
    text: "They gave my hair three sittings before touching a single strand with colour. I have never left a salon looking this considered.",
    author: "— Areeba K., Bridal Client"
  },
  {
    text: "The scalp ritual alone is worth the visit. It's the only place in the city that treats a 90-minute appointment as normal, not a luxury.",
    author: "— Hina M., Regular Client"
  },
  {
    text: "My balayage grew out for four months and still looked intentional. That's the difference between a colourist and a technician.",
    author: "— Sana R., Hair Atelier"
  }
];
let quoteIndex = 0;
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const dotsWrap = document.getElementById('voicesDots');

testimonials.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => showQuote(i));
  dotsWrap.appendChild(dot);
});

function showQuote(i) {
  quoteIndex = i;
  quoteText.textContent = testimonials[i].text;
  quoteAuthor.textContent = testimonials[i].author;
  [...dotsWrap.children].forEach((d, idx) => d.classList.toggle('active', idx === i));
}
setInterval(() => showQuote((quoteIndex + 1) % testimonials.length), 6000);

// ===== Booking form submit =====
const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('bookingSubmit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  status.textContent = '';

  try {
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();

    if (res.ok) {
      status.textContent = "Request received — we'll confirm your slot shortly.";
      form.reset();
    } else {
      status.textContent = result.error || 'Something went wrong. Please try again.';
    }
  } catch (err) {
    status.textContent = 'Network error — please check your connection and try again.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Request Appointment';
  }
});
