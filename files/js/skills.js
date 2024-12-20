"use strict";

// Intersection Observer for skills section
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillsItems = entry.target.querySelectorAll(".skills-item");
          skillsItems.forEach((item) => {
            const progress = item.getAttribute("data-progress");
            const progressBar = item.querySelector(".skill-progress-fill");
            progressBar.style.width = `${progress}%`;
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  const skillSection = document.querySelector(".skill");
  observer.observe(skillSection);
});
