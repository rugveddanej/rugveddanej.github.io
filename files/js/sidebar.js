"use strict";

// Utility function to toggle active class
const toggleActiveClass = (element) => element.classList.toggle("active");

// Sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => toggleActiveClass(sidebar));

// InfoMoreBtn functionality
const InfoMoreBtn = (() => {
  const infoMoreBtn = document.querySelector(".info_more-btn");
  if (infoMoreBtn) {
    infoMoreBtn.style.webkitTapHighlightColor = "transparent";
    infoMoreBtn.addEventListener("click", function () {
      const icon = this.querySelector("ion-icon");
      if (icon)
        icon.name =
          icon.name === "chevron-down" ? "chevron-up" : "chevron-down";
    });
  }
})();
