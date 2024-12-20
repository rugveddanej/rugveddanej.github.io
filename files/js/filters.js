"use strict";

// Utility function to set the text color of an element
const setTextColor = (element, color) => {
  element.style.color = color;
};

// Custom select dropdown functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Function to filter content based on selected categories
const filterContent = (selectedValues) => {
  filterItems.forEach((item) => {
    const itemCategory = item.dataset.category.toLowerCase();
    item.classList.toggle(
      "active",
      selectedValues.has("all") || selectedValues.has(itemCategory),
    );
  });
};

const selectedCategories = new Set(["all"]);

// Set all filter items to active by default
filterContent(selectedCategories);

// Set the default color for the "All" category
selectItems.forEach((item) => {
  if (item.innerText.toLowerCase() === "all") {
    setTextColor(item, "#FE3D58");
  }
});

select.addEventListener("click", () => toggleActiveClass(select));

selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectedValue === "all") {
      selectedCategories.clear();
      selectedCategories.add("all");
      filterBtns.forEach((btn) => {
        btn.classList.remove("active");
        setTextColor(btn, ""); // Reset color
      });
      selectItems.forEach((item) => {
        setTextColor(item, ""); // Reset all colors
      });
      setTextColor(this, "#FE3D58"); // Change color of "All"
    } else {
      selectedCategories.delete("all");
      if (selectedCategories.has(selectedValue)) {
        selectedCategories.delete(selectedValue);
        this.classList.remove("active");
        setTextColor(this, ""); // Reset color
      } else {
        selectedCategories.add(selectedValue);
        this.classList.add("active");
        setTextColor(this, "#FE3D58"); // Change color
      }
      selectItems.forEach((item) => {
        if (item.innerText.toLowerCase() === "all") {
          setTextColor(item, ""); // Reset color of "All"
        }
      });
    }
    if (selectedCategories.size === 0) {
      selectedCategories.add("all");
      selectItems.forEach((item) => {
        if (item.innerText.toLowerCase() === "all") {
          setTextColor(item, "#FE3D58"); // Change color of "All"
        }
      });
    }
    selectValue.innerText = Array.from(selectedCategories).join(", ");
    filterContent(selectedCategories);
    // Comment out or remove the next line to keep the select list open
    // toggleActiveClass(select);
  });
});

// Filter button functionality for large screens
filterBtns.forEach((button) => {
  button.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectedValue === "all") {
      selectedCategories.clear();
      selectedCategories.add("all");
      filterBtns.forEach((btn) => {
        btn.classList.remove("active");
        setTextColor(btn, ""); // Reset color
      });
      filterBtns.forEach((btn) => {
        setTextColor(btn, ""); // Reset all colors
      });
      this.classList.add("active");
      setTextColor(this, "#FE3D58"); // Change color of "All"
    } else {
      selectedCategories.delete("all");
      if (selectedCategories.has(selectedValue)) {
        selectedCategories.delete(selectedValue);
        this.classList.remove("active");
        setTextColor(this, ""); // Reset color
      } else {
        selectedCategories.add(selectedValue);
        this.classList.add("active");
        setTextColor(this, "#FE3D58"); // Change color
      }
      filterBtns.forEach((btn) => {
        if (btn.innerText.toLowerCase() === "all") {
          setTextColor(btn, ""); // Reset color of "All"
        }
      });
    }
    if (selectedCategories.size === 0) {
      selectedCategories.add("all");
      filterBtns.forEach((btn) => {
        if (btn.innerText.toLowerCase() === "all") {
          setTextColor(btn, "#FE3D58"); // Change color of "All"
        }
      });
    }
    selectValue.innerText = Array.from(selectedCategories).join(", ");
    filterContent(selectedCategories);
  });
});
