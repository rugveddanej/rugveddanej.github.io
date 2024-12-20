"use strict";

document.getElementById("search-input").addEventListener("keyup", function () {
  let filter = this.value.toLowerCase();
  let projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item) => {
    let title = item.querySelector(".project-title").textContent.toLowerCase();
    if (title.includes(filter)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});
