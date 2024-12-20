document.addEventListener("DOMContentLoaded", function () {
  // Disable right-click context menu
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Disable copy
  document.addEventListener("copy", function (e) {
    e.preventDefault();
  });

  // Disable cut
  document.addEventListener("cut", function (e) {
    e.preventDefault();
  });

  // Disable paste
  document.addEventListener("paste", function (e) {
    e.preventDefault();
  });

  // Disable text selection
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });

  // Ensure these actions don't interfere with other default behaviors
  document.addEventListener("mousedown", function (e) {
    if (e.detail > 1) {
      // prevent double-click selection
      e.preventDefault();
    }
  });

  document.addEventListener("mouseup", function (e) {
    if (e.detail > 1) {
      // prevent double-click selection
      e.preventDefault();
    }
  });
});
