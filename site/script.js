const navToggle = document.querySelector("[data-nav-toggle]");
const currentPage = document.body.dataset.page;
const pageTurnDuration = 680;

const helper = document.createElement("div");
helper.className = "page-helper";
helper.setAttribute("aria-hidden", "true");
helper.innerHTML = `
  <span class="page-helper__spark">✦</span>
  <svg class="page-helper__figure" viewBox="0 0 96 142" focusable="false">
    <circle class="page-helper__head" cx="48" cy="26" r="15"></circle>
    <path class="page-helper__line" d="M48 43 L48 82"></path>
    <path class="page-helper__line page-helper__arm" d="M48 55 C36 57 28 65 20 77"></path>
    <path class="page-helper__line" d="M48 56 C60 58 69 66 76 77"></path>
    <path class="page-helper__line" d="M48 82 L32 119"></path>
    <path class="page-helper__line" d="M48 82 L65 119"></path>
    <circle class="page-helper__hand" cx="18" cy="79" r="5"></circle>
    <path class="page-helper__accent" d="M58 23 L68 28 L58 33 Z"></path>
  </svg>
  <span class="page-helper__ledge"></span>
`;

const pageTurn = document.createElement("div");
pageTurn.className = "page-turn";
pageTurn.setAttribute("aria-hidden", "true");
pageTurn.innerHTML = '<span class="page-turn__sheet"></span>';

document.body.append(helper, pageTurn);

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    helper.classList.toggle("is-alert", isOpen);
  });
}

document.querySelectorAll("[data-page-link]").forEach((link) => {
  if (link.dataset.pageLink === currentPage) {
    link.classList.add("is-active");
  }
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = contactForm.querySelector("[data-form-note]");
    if (note) {
      note.textContent = "Message staged. Replace this with your preferred form handler before launch.";
    }
  });
}

let previousScrollY = window.scrollY;
let scrollTimer;

const updateHelperFromScroll = () => {
  const scrollingDown = window.scrollY > previousScrollY;
  const awayFromTop = window.scrollY > 72;

  helper.classList.toggle("is-peeking", awayFromTop);

  if (scrollingDown && awayFromTop && !document.body.classList.contains("nav-open")) {
    helper.classList.remove("is-alert");
    void helper.offsetWidth;
    helper.classList.add("is-alert");
  }

  previousScrollY = window.scrollY;
  window.clearTimeout(scrollTimer);
  scrollTimer = window.setTimeout(() => {
    if (!document.body.classList.contains("nav-open")) {
      helper.classList.remove("is-alert");
    }
  }, 760);
};

window.addEventListener("scroll", updateHelperFromScroll, { passive: true });
updateHelperFromScroll();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".nav__link[href$='.html'], .mobile-panel__links a[href$='.html']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const url = new URL(link.getAttribute("href"), window.location.href);

    if (url.href === window.location.href || prefersReducedMotion) {
      return;
    }

    event.preventDefault();
    document.body.classList.remove("nav-open");
    document.body.classList.add("page-turning");
    helper.classList.add("is-pulling");
    helper.classList.remove("is-alert");

    window.setTimeout(() => {
      window.location.href = url.href;
    }, pageTurnDuration);
  });
});
