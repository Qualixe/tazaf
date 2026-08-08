"use strict";
// navbar search roller js start ----
document.querySelectorAll(".search-roller").forEach((roller) => {
  const track = roller.querySelector(".search-roller-track");
  const items = [...track.children];

  if (items.length <= 1) return;

  // Duplicate first item
  track.appendChild(items[0].cloneNode(true));

  const itemHeight = items[0].offsetHeight;

  let index = 0;
  let total = items.length;

  function next() {
    index++;

    track.style.transition = "transform .9s ease";
    track.style.transform = `translateY(-${index * itemHeight}px)`;

    // Reset when duplicate reached
    if (index === total) {
      track.addEventListener("transitionend", function reset() {
        track.removeEventListener("transitionend", reset);

        track.style.transition = "none";
        track.style.transform = "translateY(0)";

        index = 0;

        // Force reflow
        track.offsetHeight;
      });
    }
  }

  setInterval(next, 2000);
});
// navbar search roller js end --

// navbar sticky search js start----
let lastScroll = 0;

window.addEventListener("load", handleScroll);
window.addEventListener("scroll", handleScroll);

function handleScroll() {
  const scrolling = window.scrollY;
  const header = document.querySelector(".header");
  const home_nav_active = document.querySelector(".home-nav-active");

  lastScroll = scrolling;

  if ((scrolling > 80) & header.classList.contains("home-nav-active")) {
    home_nav_active.classList.add("home-nav");
  } else if ((scrolling < 80) & header.classList.contains("home-nav-active")) {
    home_nav_active.classList.remove("home-nav");
  }
}
// navbar sticky search js end----

// navbar search open js start ---
document.addEventListener("click", function (e) {
  // Close Search
  if (
    e.target.closest(".search-bar-close") ||
    e.target.closest(".search-bar-window-cls-btn")
  ) {
    document.querySelector(".search-bar-wrap")?.classList.remove("active");
    document.body.classList.remove("active");
    return;
  }

  // Open Search
  if (e.target.closest(".navbar-search-open-btn")) {
    document.querySelector(".search-bar-wrap")?.classList.add("active");
    document.body.classList.add("active");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Remove active from search wrap
    document.querySelectorAll(".search-bar-wrap.active").forEach((el) => {
      el.classList.remove("active");
    });

    // Remove active from body
    document.body.classList.remove("active");
  }
});
// navbar search open js end ---

// mobile-menu sidebar js start---
const mobileMenu = document.querySelector(".mobile-menu-wrap");
const mobileMenuContainer = document.querySelector(".mobile-menu-container");

function openMobileMenu(event) {
  event.stopPropagation();
  mobileMenu?.classList.add("active");
  mobileMenuContainer?.classList.add("active");
}

function closeMobileMenu(event) {
  event.stopPropagation();
  mobileMenu?.classList.remove("active");
  mobileMenuContainer?.classList.remove("active");
}

document.querySelectorAll(".app-menu-open").forEach((btn) => {
  btn.addEventListener("click", openMobileMenu);
});

document
  .querySelectorAll(".mobile-menu-close-window-btn, .mobile-menu-close-btn")
  .forEach((btn) => {
    btn.addEventListener("click", closeMobileMenu);
  });

// mobile-menu sidebar js end---

// mobile-menu-tab js start--
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".mobile-menu-tabs-contents");
  const tabs = [...document.querySelectorAll(".mobile-menu-tab")];
  const contents = [...document.querySelectorAll(".mobile-menu-tabs-content")];

  if (!container || !tabs.length || !contents.length) return;

  let isClickScroll = false;
  let scrollTimer;

  const setActive = (id, scroll = true) => {
    const tab = tabs.find((el) => el.hash === `#${id}`);
    if (!tab) return;

    tabs.forEach((el) => el.classList.toggle("active", el === tab));

    if (scroll) {
      tab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  // Tab click
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      const target = document.getElementById(tab.hash.slice(1));
      if (!target) return;

      isClickScroll = true;
      setActive(target.id);

      container.scrollTo({
        top: target.offsetTop - container.offsetTop - 12,
        behavior: "smooth",
      });

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isClickScroll = false;
      }, 2000);
    });
  });

  // Content scroll
  const observer = new IntersectionObserver(
    (entries) => {
      if (isClickScroll) return;

      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActive(visible.target.id);
    },
    {
      root: container,
      rootMargin: "-10% 0px -55% 0px",
      threshold: [0.15, 0.3, 0.5, 0.75],
    },
  );

  contents.forEach((content) => observer.observe(content));

  // Initial state
  setActive(
    tabs.find((tab) => tab.classList.contains("active"))?.hash.slice(1) ||
      tabs[0].hash.slice(1),
    false,
  );
});
// mobile-menu-tab js end--

// cart-drawer js start---
const cartDrawer = document.querySelector(".cart-drawer");
const cartDrawerInner = document.querySelector(".cart-drawer-inner");

function openCartDrawer(event) {
  event.stopPropagation();
  cartDrawer?.classList.add("active");
  cartDrawerInner?.classList.add("active");
}

function closeCartDrawer(event) {
  event.stopPropagation();
  cartDrawer?.classList.remove("active");
  cartDrawerInner?.classList.remove("active");
}

document.querySelectorAll(".cart-drawer-open").forEach((btn) => {
  btn.addEventListener("click", openCartDrawer);
});

document
  .querySelectorAll(".cart-drawer-close-window-btn, .cart-drawer-close-btn")
  .forEach((btn) => {
    btn.addEventListener("click", closeCartDrawer);
  });

// cart-drawer js end---

// cart-drawer slider js start--
var swiper = new Swiper(".cart-drawer-slider", {
  slidesPerView: 1.3,
  spaceBetween: 16,
  grabCursor: true,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".cart-drawer-slider-btn-next",
    prevEl: ".cart-drawer-slider-btn-prev",
  },
});
// cart-drawer slider js end--

// cart-drawer progesss-bar js start--
const progress = document.querySelector(".progress");
progress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #d55a3c 0%, #422c26 ${value}%,rgb(236 219 216) ${value}%)`;
});
// cart-drawer progesss-bar js end--

// hero slider js start--
var swiper = new Swiper(".hero-slider", {
  slidesPerView: 1,
  grabCursor: true,
  spaceBetween: 16,
  loop: true,
  speed: 1000,
  autoplay: false,
  // autoplay: {
  //   delay: 3500,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: ".hero-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".hero-button-next",
    prevEl: ".hero-button-prev",
  },
});
// hero slider js end--

// Footer dropdown responsive accordion js start --
document.addEventListener("DOMContentLoaded", () => {
  const breakpoint = window.matchMedia("(max-width: 992px)");
  const items = document.querySelectorAll(".footer-item");

  const closeItem = (item) => {
    const content = item.querySelector(".footer-content");
    if (!content) return;

    item.classList.remove("active");
    content.style.maxHeight = "0px";
  };

  const openItem = (item) => {
    const content = item.querySelector(".footer-content");
    if (!content) return;

    item.classList.add("active");
    content.style.maxHeight = `${content.scrollHeight}px`;
  };

  const setupAccordion = () => {
    items.forEach((item) => {
      const title = item.querySelector(".footer-item-title");
      const content = item.querySelector(".footer-content");

      if (!title || !content) return;

      // Remove previous inline state
      title.onclick = null;

      if (!breakpoint.matches) {
        item.classList.remove("active");
        content.style.maxHeight = "";
        return;
      }

      // Mobile: close initially
      closeItem(item);

      title.onclick = () => {
        const isActive = item.classList.contains("active");

        // Close others
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            closeItem(otherItem);
          }
        });

        // Toggle current
        isActive ? closeItem(item) : openItem(item);
      };
    });
  };

  setupAccordion();

  // Handle responsive resize
  breakpoint.addEventListener("change", setupAccordion);
});
// Footer dropdown responsive accordion js end --

// text-grid js start---
document.addEventListener("DOMContentLoaded", () => {
  const mq = window.matchMedia("(max-width:575px)");
  const items = [...document.querySelectorAll(".text-grids .text-grid")];
  const btn = document.getElementById("textGridToggleBtn");
  function update(reset = true) {
    if (!btn) return;
    if (!mq.matches) {
      items.forEach((i) => (i.style.display = ""));
      btn.style.display = "none";
      btn.dataset.expanded = "false";
      return;
    }
    btn.style.display = "inline-flex";
    const expanded = btn.dataset.expanded === "true";
    items.forEach((el, idx) => {
      el.style.display = expanded || idx < 3 ? "flex" : "none";
    });
    btn.textContent = expanded ? "Load Less" : "Load More";
  }
  btn?.addEventListener("click", () => {
    btn.dataset.expanded = btn.dataset.expanded === "true" ? "false" : "true";
    update(false);
    if (btn.dataset.expanded !== "true") {
      document
        .querySelector(".text-grid-section")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  mq.addEventListener("change", () => {
    btn.dataset.expanded = "false";
    update();
  });
  update();
});
// text-grid js end---
