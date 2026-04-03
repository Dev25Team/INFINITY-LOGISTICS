const nav = document.querySelector(".nav");
const burger = document.querySelector(".nav__burger");
const modals = document.querySelectorAll(".modal");
const navLinks = document.querySelectorAll(".nav__links a");

const openModal = (id) => {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
};

const closeModal = (modal) => {
  modal.classList.remove("is-open");
  const hasOpenModals = [...modals].some((item) =>
    item.classList.contains("is-open"),
  );
  if (!hasOpenModals) {
    document.body.style.overflow = "";
  }
};

const showToast = (message) => {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 320);
  }, 2600);
};

burger?.addEventListener("click", () => {
  nav?.classList.toggle("is-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
  });
});

window.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-open]");
  if (trigger) {
    openModal(trigger.dataset.open);
    return;
  }

  if (event.target.matches("[data-close]")) {
    const modal = event.target.closest(".modal");
    if (modal) closeModal(modal);
  }

  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => closeModal(modal));
  }
});

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    const modal = form.closest(".modal");
    if (modal) closeModal(modal);
    showToast("Request sent. Logic Core will contact you shortly.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const revealTargets = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealIfInView = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.9;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 },
  );

  revealTargets.forEach((element) => {
    if (revealIfInView(element)) {
      element.classList.add("is-revealed");
      return;
    }
    element.classList.add("reveal");
    observer.observe(element);
  });
} else {
  revealTargets.forEach((element) => element.classList.add("is-revealed"));
}
