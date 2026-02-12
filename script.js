const nav = document.querySelector('.nav');
const burger = document.querySelector('.nav__burger');
const modals = document.querySelectorAll('.modal');

const openModal = (id) => {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('is-open');
};

const closeModal = (modal) => {
  modal.classList.remove('is-open');
};

const showToast = (message) => {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-visible'));

  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
};

burger?.addEventListener('click', () => {
  nav?.classList.toggle('is-open');
});

window.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-open]');
  if (trigger) {
    openModal(trigger.dataset.open);
    return;
  }

  if (event.target.matches('[data-close]')) {
    const modal = event.target.closest('.modal');
    if (modal) closeModal(modal);
  }

  if (event.target.classList.contains('modal')) {
    closeModal(event.target);
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modals.forEach((modal) => closeModal(modal));
  }
});

const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    const modal = form.closest('.modal');
    if (modal) closeModal(modal);
    showToast('Thank you! We will contact you shortly.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

const revealTargets = document.querySelectorAll('section, .hero__card, .hero__photo, .service, .doctor, .tour__shot, .testimonials__grid article');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealTargets.forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});
