(() => {
  const body = document.body;
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");

  function closeMenu() {
    if (!menuButton || !nav) return;
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    body.classList.remove("menu-open");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
      body.classList.toggle("menu-open", !open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const wasOpen = button.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".faq-item").forEach(other => {
        other.classList.remove("open");
        const otherButton = other.querySelector("button");
        if (otherButton) otherButton.setAttribute("aria-expanded", "false");
      });

      if (!wasOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

  const form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const get = key => String(data.get(key) || "").trim();
      const subject = `Pit Stop Coffee event inquiry — ${get("eventType") || "Event"}`;
      const message = [
        "Hi Pit Stop Coffee,",
        "",
        "I would like written pricing for an event.",
        "",
        `Name: ${get("name")}`,
        `Reply email: ${get("email")}`,
        `Event type: ${get("eventType")}`,
        `Estimated guests: ${get("guests")}`,
        `Event date: ${get("date") || "Not selected"}`,
        `Service length: ${get("length") || "Not sure yet"}`,
        `Event city: ${get("city") || "Not provided"}`,
        `Setup: ${get("setup") || "Not sure yet"}`,
        "",
        "Event details:",
        get("message") || "No additional details yet.",
        "",
        "Please reply by email with expected pricing and what is included.",
        "",
        "Thank you!"
      ].join("\n");

      window.location.href =
        `mailto:info@pitstopcoffee.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    });
  }
})();
