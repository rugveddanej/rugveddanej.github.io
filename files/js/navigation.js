document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Calculate age
  function calculateAge(birthdayStr) {
    const today = new Date();
    const birthDate = new Date(birthdayStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Update age
  function updateAge() {
    const ageElement = document.getElementById("age");
    const birthday = "2008-07-31"; // Your birthday
    const age = calculateAge(birthday);
    ageElement.textContent = age;
  }

  updateAge();

  // Page navigation functionality
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");
  let currentPage = "";

  function navigateToPage(pageName) {
    navigationLinks.forEach((navLink) => navLink.classList.remove("active"));
    pages.forEach((page) => {
      const isActive = page.dataset.page === pageName;
      page.classList.toggle("active", isActive);
      if (isActive) {
        currentPage = page.dataset.page;
        const activeLink = [...navigationLinks].find(
          (link) => link.innerHTML.toLowerCase() === pageName
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
    window.scrollTo(0, 0);
    if (window.location.hash.substring(1) !== pageName) {
      history.pushState({ page: pageName }, "", `#${pageName}`);
    }
  }

  navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const pageName = this.innerHTML.toLowerCase();
      navigateToPage(pageName);
    });
  });

  window.addEventListener("popstate", function (event) {
    if (event.state && event.state.page) {
      navigateToPage(event.state.page);
    } else if (!event.state && window.location.hash) {
      navigateToPage(window.location.hash.substring(1));
    }
  });

  // Check if there's a page in the URL hash, otherwise do nothing
  const initialPage = window.location.hash.substring(1);
  if (
    initialPage &&
    [...pages].some((page) => page.dataset.page === initialPage)
  ) {
    navigateToPage(initialPage);
  }
});