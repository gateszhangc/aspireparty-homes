// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.setAttribute(
        "aria-expanded",
        links.classList.contains("open").toString()
      );
    });

    // Close nav on link click
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth scroll reveal on intersection
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll(".section").forEach((el) => observer.observe(el));
  document.querySelectorAll(".card, .manifesto-item, .endorsement-card, .cta-card, .achievement-stat").forEach((el) => observer.observe(el));
});
