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

  // Contact form: submits to Formspree via fetch so the visitor stays on the page.
  // Falls back to a normal form POST (form's action/method attributes) if JS fails.
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = document.querySelector("#form-status");
      const submitBtn = form.querySelector("button[type=submit]");
      if (submitBtn) submitBtn.disabled = true;
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Form submission failed");
        if (status) {
          status.textContent = "Thanks for reaching out! We'll get back to you soon.";
          status.classList.add("visible");
        }
        form.reset();
      } catch (err) {
        if (status) {
          status.textContent = "Something went wrong sending your message — please email hookedmediastrategy@gmail.com directly.";
          status.classList.add("visible");
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});
