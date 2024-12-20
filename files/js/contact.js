"use strict";

// Contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");

// Disable the submit button by default
formBtn.disabled = true;

formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    // Enable the submit button only if the form is valid
    formBtn.toggleAttribute("disabled", !form.checkValidity());
  });
});

// Handle reCAPTCHA token and form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  formBtn.disabled = true;

  grecaptcha.ready(function() {
    grecaptcha.execute('6LdPfJoqAAAAAFOlO1GUmCML-E9hfalTt-_Uco_c', { action: 'submit' }).then(function(token) {
      document.getElementById('g-recaptcha-response').value = token;
      SendMail();
    });
  });
});

function SendMail() {
  var params = {
    from_name: sanitize(document.getElementById("fullName").value),
    email_id: sanitize(document.getElementById("email_id").value),
    message: sanitize(document.getElementById("message").value),
  };

  emailjs.send("service_oll3cu6", "template_gb7sb08", params).then(
    function (res) {
      modal.style.display = "block";
      setTimeout(() => {
        modal.style.display = "none";
        formBtn.disabled = false;
      }, 5000);
    },
    function (error) {
      console.error("Failed...", error);
      formBtn.disabled = false;
    }
  );
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Generate reCAPTCHA token on page load
grecaptcha.ready(function() {
  grecaptcha.execute('6LdPfJoqAAAAAFOlO1GUmCML-E9hfalTt-_Uco_c', {action: 'submit'}).then(function(token) {
    document.getElementById('g-recaptcha-response').value = token;
  });
});

function sanitize(input) {
  const element = document.createElement('div');
  element.innerText = input;
  return element.innerHTML;
}