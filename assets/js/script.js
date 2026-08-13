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
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".hero-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".hero-button-next",
    prevEl: ".hero-button-prev",
  },
  breakpoints: {
    1: {
      spaceBetween: 0,
    },
    993: {
      spaceBetween: 16,
    },
  },
});
// hero slider js end--

// category js start--
var swiper = new Swiper(".category-slider", {
  slidesPerView: "auto",
  spaceBetween: 10,
  grabCursor: true,
  loop: false,
});
// category js end--

// count-down js start--
document.querySelectorAll(".countdown").forEach((countdown) => {
  const endDate = new Date(countdown.dataset.end).getTime();

  const daysEl = countdown.querySelector(".countdown-days");
  const hoursEl = countdown.querySelector(".countdown-hours");
  const minutesEl = countdown.querySelector(".countdown-minutes");
  const secondsEl = countdown.querySelector(".countdown-seconds");

  const updateCountdown = () => {
    const remaining = endDate - Date.now();

    if (remaining <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
// count-down js end--

// card slider js start--
var swiper = new Swiper(".card-slider", {
  effect: "coverflow",
  slidesPerView: 1.6,
  centeredSlides: true,
  grabCursor: true,
  spaceBetween: 16,
  loop: true,
  speed: 500,
  autoplay: false,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 150,
    modifier: 1,
    slideShadows: false,
  },
  // autoplay: {
  //   delay: 3500,
  //   disableOnInteraction: false,
  // },
  breakpoints: {
    1: {
      effect: "coverflow",
      slidesPerView: 1.4,
      centeredSlides: true,
      spaceBetween: 24,
    },
    576: {
      effect: "coverflow",
      slidesPerView: 2.2,
      centeredSlides: true,
      spaceBetween: 16,
    },
    768: {
      effect: "slide",
      slidesPerView: 3.2,
      centeredSlides: false,
      spaceBetween: 10,
    },
    993: {
      effect: "slide",
      slidesPerView: 3.8,
      centeredSlides: false,
      spaceBetween: 10,
    },
    1200: {
      effect: "slide",
      slidesPerView: 4.5,
      centeredSlides: false,
      spaceBetween: 10,
    },
  },
});
// card slider js end--

// tab-section js start--
document.querySelectorAll(".tab-section-nav-item").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    document
      .querySelectorAll(".tab-section-nav-item")
      .forEach((el) => el.classList.toggle("active", el === tab));

    document
      .querySelectorAll(".tab-section-panel")
      .forEach((panel) =>
        panel.classList.toggle("active", panel.id === target),
      );
  });
});
// tab-section js end--

// image-category-slider js start--
var swiper = new Swiper(".image-category-slider", {
  slidesPerView: 4,
  spaceBetween: 20,
  grabCursor: true,
  loop: false,
  breakpoints: {
    // when window width is >= 320px
    1: {
      spaceBetween: 10,
      slidesPerView: 1.7,
    },
    // when window width is >= 576px
    576: {
      spaceBetween: 10,
      slidesPerView: 2.2,
    },
    // when window width is >= 767px
    768: {
      spaceBetween: 16,
      slidesPerView: 3.3,
    },
    // when window width is >= 993px
    993: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
  },
});
// image-category-slider js end--

// community-review popup js start--
(function () {
  const items = document.querySelectorAll(".community-review-item");
  const popup = document.querySelector(".community-review-popup");

  if (!popup || !items.length) return;

  const slides = [...popup.querySelectorAll(".community-review-popup-slide")];
  const videos = slides.map((slide) =>
    slide.querySelector(".community-review-popup-video"),
  );
  const progressBars = [
    ...popup.querySelectorAll(".community-review-popup-progress-bar"),
  ];
  const prevBtn = popup.querySelector(".community-review-popup-nav-btn.prev");
  const nextBtn = popup.querySelector(".community-review-popup-nav-btn.next");
  const muteBtn = popup.querySelector(".community-review-popup-mute-btn");
  const productImg = popup.querySelector(
    ".community-review-popup-product-img img",
  );
  const productTitle = popup.querySelector(
    ".community-review-popup-product-title",
  );
  const productPrice = popup.querySelector(
    ".community-review-popup-product-price .curr",
  );
  const productPrevPrice = popup.querySelector(
    ".community-review-popup-product-price .prev",
  );

  let current = 0;
  let muted = true;

  function pauseAll() {
    videos.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  }

  function goTo(index) {
    if (index < 0 || index >= slides.length) return;

    pauseAll();
    current = index;

    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));

    progressBars.forEach((bar, i) => {
      bar.classList.toggle("completed", i < index);
      bar.querySelector("i").style.width = i < index ? "100%" : "0%";
    });

    const slide = slides[index];
    productImg.src = slide.dataset.productImg;
    productTitle.textContent = slide.dataset.productTitle;
    productPrice.textContent = slide.dataset.productPrice;
    productPrevPrice.textContent = slide.dataset.productPreviousPrice;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;

    const video = videos[index];
    video.muted = muted;
    video.currentTime = 0;
    video.play().catch(() => {});
  }

  function openPopup(index) {
    document.body.classList.add("active");
    popup.classList.add("active");
    goTo(index);
  }

  function closePopup() {
    popup.classList.remove("active");
    document.body.classList.remove("active");
    pauseAll();
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      openPopup(Number(item.dataset.reviewIndex) || 0);
    });
  });

  popup
    .querySelector(".community-review-popup-close-window-btn")
    .addEventListener("click", closePopup);
  popup
    .querySelector(".community-review-popup-close-btn")
    .addEventListener("click", closePopup);

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  muteBtn.addEventListener("click", () => {
    muted = !muted;
    videos[current].muted = muted;
    muteBtn.classList.toggle("unmuted", !muted);
  });

  popup.querySelectorAll(".community-review-popup-share-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (navigator.share) {
        navigator.share({ title: document.title, url: window.location.href });
      }
    });
  });

  videos.forEach((video, i) => {
    video.addEventListener("timeupdate", () => {
      if (i !== current || !video.duration) return;
      progressBars[i].querySelector("i").style.width =
        (video.currentTime / video.duration) * 100 + "%";
    });

    video.addEventListener("ended", () => {
      if (i === current && current < slides.length - 1) {
        goTo(current + 1);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (!popup.classList.contains("active")) return;
    if (e.key === "Escape") closePopup();
    if (e.key === "ArrowRight") goTo(current + 1);
    if (e.key === "ArrowLeft") goTo(current - 1);
  });
})();
// community-review popup js end--

// review-tab-section js start--
document.querySelectorAll(".review-tab-nav-item").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.reviewTab;

    document
      .querySelectorAll(".review-tab-nav-item")
      .forEach((el) => el.classList.toggle("active", el === tab));

    document
      .querySelectorAll(".review-tab-panel")
      .forEach((panel) => panel.classList.toggle("active", panel.id === target));
  });
});
// review-tab-section js end--

// collection-category-slider js start--
var swiper = new Swiper(".collection-category-slider", {
  slidesPerView: "auto",
  spaceBetween: 20,
  grabCursor: true,
  loop: false,
  breakpoints: {
    1: {
      spaceBetween: 10,
    },
    576: {
      spaceBetween: 20,
    },
  },
});
// collection-category-slider js end--

// collection filter js start---
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".collection-filter");

  // Filter sidebar
  document
    .querySelectorAll(
      ".filter-open-btn, .filter-window-close-btn, .filter-close-btn",
    )
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = btn.classList.contains("filter-open-btn");

        sidebar?.classList.toggle("active", open);
        document.body.classList.toggle("active", open);
      });
    });

  // Accordion
  document.querySelectorAll(".accordion-toggle-btn").forEach((btn) => {
    const content = btn.nextElementSibling;

    content.style.maxHeight = `${content.scrollHeight}px`;
    btn.parentElement.classList.add("active");

    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("active");

      content.style.maxHeight = content.style.maxHeight
        ? null
        : `${content.scrollHeight}px`;
    });
  });
});
// collection filter js end---

// product-slider js start---
var swiper = new Swiper(".product-slider-thumb", {
  direction: "vertical",
  loop: false,
  spaceBetween: 20,
  slidesPerView: 5,
  freeMode: true,
  mousewheel: true,
  breakpoints: {
    // when window width is >= 320px
    1: {
      direction: "horizontal",
      spaceBetween: 10,
      slidesPerView: 4,
    },
    // when window width is >= 576px
    576: {
      direction: "horizontal",
      spaceBetween: 20,
      slidesPerView: 5,
    },
    // when window width is >= 767px
    768: {
      direction: "vertical",
      spaceBetween: 20,
      slidesPerView: 5,
    },
    // when window width is >= 767px
    993: {
      direction: "vertical",
    },
  },
});
var swiper2 = new Swiper(".product-slider", {
  loop: true,
  autoHeight: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".product-slider-pagination",
    clickable: true,
  },
  thumbs: {
    swiper: swiper,
  },
});
// product-slider js end---

// Product Slider Modal
const productModal = document.querySelector(".product-slider-modal");

document
  .querySelector(".product-slider .swiper-wrapper")
  ?.addEventListener("click", (e) => {
    e.stopPropagation();
    productModal?.classList.add("active");
  });

document
  .querySelector(".product-slider-modal-close")
  ?.addEventListener("click", (e) => {
    e.stopPropagation();
    productModal?.classList.remove("active");
  });

productModal?.addEventListener("click", () => {
  productModal.classList.remove("active");
});

// Size Chart Sidebar
const sizeSidebar = document.querySelector(".size-chart-sidebar");
const sizeSidebarInner = document.querySelector(".size-chart-sidebar-inner");

const toggleSizeChart = (open, e) => {
  e?.stopPropagation();

  sizeSidebar?.classList.toggle("active", open);
  sizeSidebarInner?.classList.toggle("active", open);
  document.body.classList.toggle("active", open);
};

document
  .querySelector(".size-sidebar-btn")
  ?.addEventListener("click", (e) => toggleSizeChart(true, e));

document
  .querySelector(".size-chart-sidebar-close-window-btn")
  ?.addEventListener("click", (e) => toggleSizeChart(false, e));

document
  .querySelector(".size-chart-close-btn")
  ?.addEventListener("click", (e) => toggleSizeChart(false, e));

// product accordion--
document.querySelectorAll(".product-accordion-toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const content = btn.nextElementSibling;

    document
      .querySelectorAll(".product-accordion-item.active")
      .forEach((active) => {
        if (active !== item) {
          active.classList.remove("active");
          active.querySelector(
            ".product-accordion-item-content",
          ).style.maxHeight = null;
        }
      });

    item.classList.toggle("active");
    content.style.maxHeight = item.classList.contains("active")
      ? `${content.scrollHeight}px`
      : null;
  });
});
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
