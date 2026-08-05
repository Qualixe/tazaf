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
document.querySelectorAll(".navbar-search").forEach((search) => {
  const openBtn = search.querySelector(".search-open");
  const closeBtns = search.querySelectorAll(
    ".search-bar-window-cls-btn, .search-bar-close",
  );
  const searchWrap = search.querySelector(".search-bar-wrap");
  const body = document.body;

  // Open Search
  openBtn?.addEventListener("click", () => {
    searchWrap.classList.add("active");
    body.classList.add("active");
  });

  // Close Search
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      searchWrap.classList.remove("active");
      body.classList.remove("active");
    });
  });
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

// accordion js start----
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion-items").forEach((section) => {
    const items = section.querySelectorAll(".accordion-item");

    function openItem(item) {
      const content = item.querySelector(".accordion-item-content");
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }

    function closeItem(item) {
      const content = item.querySelector(".accordion-item-content");
      item.classList.remove("active");
      content.style.maxHeight = null;
    }

    // ==========================
    // DEFAULT OPEN
    // ==========================

    if (section.classList.contains("toggle-item") && items.length) {
      openItem(items[0]);
    } else if (section.classList.contains("all-item-open")) {
      items.forEach(openItem);
    } else if (section.classList.contains("first-item-open") && items.length) {
      openItem(items[0]);
    }

    // Recalculate height after page fully loaded (fix refresh height cut issue)
    window.addEventListener("load", () => {
      items.forEach((item) => {
        if (item.classList.contains("active")) {
          const content = item.querySelector(".accordion-item-content");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });

    // Recalculate on resize
    window.addEventListener("resize", () => {
      items.forEach((item) => {
        if (item.classList.contains("active")) {
          const content = item.querySelector(".accordion-item-content");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });

    // ==========================
    // CLICK
    // ==========================

    items.forEach((item) => {
      const header = item.querySelector(".accordion-item-title-wrap");

      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // all-item-open mode
        if (section.classList.contains("toggle-item")) {
          if (isActive) {
            closeItem(item);
          } else {
            openItem(item);
          }
          return;
        }

        if (section.classList.contains("all-item-open")) {
          if (isActive) {
            closeItem(item);
          } else {
            openItem(item);
          }
          return;
        }

        // single-open mode
        items.forEach(closeItem);

        if (!isActive) {
          openItem(item);
        }
      });
    });
  });
});
// accordion js end----

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
