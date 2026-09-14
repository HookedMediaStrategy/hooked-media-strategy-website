// Hooked Media Strategy — small site behaviors (no build step required)

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  document.querySelectorAll(".year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => links.classList.remove("open"));
    });
  }

  // Highlight the current page in the nav.
  // Cloudflare Pages redirects "/about.html" to "/about", so normalize
  // both the current URL and each nav href to a bare page name before comparing.
  const normalize = (path) => {
    const bare = path.split("?")[0].split("#")[0].replace(/^\/+/, "").replace(/\.html$/, "");
    return bare === "" || bare === "index" ? "index" : bare;
  };
  const current = normalize(window.location.pathname);
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (normalize(link.getAttribute("href") || "") === current) {
      link.classList.add("active");
    }
  });

  // Scroll-reveal: fade + rise elements into view as the visitor scrolls.
  // Pure progressive enhancement — if JS fails, everything is already visible (no .reveal class applied).
  const revealTargets = document.querySelectorAll(
    ".card, .hero-card, .cta-banner, .section-head, .work-item, .partners-strip"
  );
  if (revealTargets.length && "IntersectionObserver" in window) {
    revealTargets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  }

  // Contact form: friendly confirmation without a backend.
  // See README.md "Wiring up the contact form" to connect this to a real inbox (Formspree, etc).
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      if (form.dataset.wired === "true") return; // let a real endpoint handle it
      e.preventDefault();
      const status = document.querySelector("#form-status");
      if (status) {
        status.textContent = "Thanks for reaching out! This form isn't connected to an inbox yet — email hookedmediastrategy@gmail.com directly, or see README.md to wire this form up.";
        status.classList.add("visible");
      }
      form.reset();
    });
  }
});
