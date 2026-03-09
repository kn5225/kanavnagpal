/* ─── PORTFOLIO SCRIPTS ─────────────────────────────────── */

// ── Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar: add .scrolled class on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Scroll reveal with IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ── Smooth active nav link highlighting
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Inject active link style dynamically
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--terracotta) !important; }`;
document.head.appendChild(style);

// ── Skill card tilt effect (subtle)
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-4px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Project card subtle parallax on mouse
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Typed tagline effect
const tagline      = document.querySelector('.hero-tagline');
const taglineText  = tagline.textContent.trim();
const lineBreakIdx = taglineText.indexOf('\n') !== -1 
  ? taglineText.indexOf('\n') 
  : taglineText.indexOf('crafting');

tagline.textContent = '';
tagline.style.minHeight = '3.5rem';

let charIndex = 0;
const fullText = taglineText.replace(/\s+/g, ' ');

function typeChar() {
  if (charIndex < fullText.length) {
    tagline.textContent += fullText[charIndex];
    charIndex++;
    setTimeout(typeChar, charIndex < 10 ? 80 : 28);
  }
}

// Start typing after short delay (let reveal animation run first)
setTimeout(typeChar, 900);

// ── Cursor dot (desktop only)
if (window.innerWidth > 900) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; z-index: 9999; pointer-events: none;
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--terracotta); opacity: 0;
    transition: opacity 0.3s, transform 0.12s ease, width 0.2s, height 0.2s;
    transform: translate(-50%, -50%);
    mix-blend-mode: multiply;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.opacity  = '0.7';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      cursor.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity = '0.7';
    });
  });
}
