// ─── SPA Router ───────────────────────────────────
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-links a[data-page]');

function navigate(pageId, pushState = true) {
  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(a => a.classList.remove('active'));

  const target = document.getElementById(pageId);
  if (target) target.classList.add('active');

  const link = document.querySelector(`.nav-links a[data-page="${pageId}"]`);
  if (link) link.classList.add('active');

  if (pushState) {
    history.pushState({ page: pageId }, '', `#${pageId}`);
  }

  window.scrollTo({ top: 0, behavior: 'instant' });

  // close mobile menu
  document.querySelector('.nav-links').classList.remove('open');
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.page);
  });
});

// Handle back/forward
window.addEventListener('popstate', e => {
  const page = e.state?.page || 'home';
  navigate(page, false);
});

// Initial load
(function () {
  const hash = location.hash.replace('#', '') || 'home';
  const valid = ['home', 'midterm', 'contact'];
  navigate(valid.includes(hash) ? hash : 'home', false);
})();


// ─── Mobile nav toggle ─────────────────────────────
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});


// ─── Collapsible Project Cards ──────────────────────
document.querySelectorAll('.project-header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.project-card');
    const isOpen = card.classList.contains('open');

    // Close all
    document.querySelectorAll('.project-card.open').forEach(c => c.classList.remove('open'));

    // Toggle current
    if (!isOpen) card.classList.add('open');
  });
});


// ─── CTA button ────────────────────────────────────
const ctaBtn = document.getElementById('cta-btn');
if (ctaBtn) {
  ctaBtn.addEventListener('click', () => navigate('midterm'));
}


// ─── Animate hero elements on load ─────────────────
window.addEventListener('load', () => {
  const items = document.querySelectorAll('#home .hero > *');
  items.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
});