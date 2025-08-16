// Simple interactions: mobile nav toggle, year update, basic form handling + smooth scroll
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav
  const navToggleButtons = document.querySelectorAll('#nav-toggle');
  const navs = document.querySelectorAll('#main-nav');

  navToggleButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // Toggle all navs on the page
      navs.forEach(nav => nav.classList.toggle('open'));
      // animate icon (optional)
      btn.classList.toggle('open');
    });
  });

  // Put current year in footer(s)
  const yearEls = [document.getElementById('year'), document.getElementById('year2'), document.getElementById('year3'), document.getElementById('year4')];
  const y = new Date().getFullYear();
  yearEls.forEach(el => { if (el) el.textContent = y; });

  // Smooth scroll for anchor links pointing to IDs on the same page
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Newsletter form (no backend): simple success feedback
  const newsletter = document.getElementById('newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = newsletter.querySelector('input[type="email"]');
      if (input && input.checkValidity()) {
        input.value = '';
        alert('Thanks! We will be in touch with travel deals.');
      } else {
        input.reportValidity();
      }
    });
  }

  // Contact form client-side validation only (no backend)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');
      const feedback = document.getElementById('contact-feedback');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        feedback.textContent = "Please fill in all required fields.";
        feedback.style.color = "crimson";
        return;
      }
      if (!email.checkValidity()) {
        feedback.textContent = "Please enter a valid email.";
        feedback.style.color = "crimson";
        return;
      }
      // Simulate send
      feedback.textContent = "Message sent! We will contact you shortly.";
      feedback.style.color = "green";
      contactForm.reset();

      // optionally close the message after a few seconds
      setTimeout(() => feedback.textContent = '', 6000);
    });
  }
});
