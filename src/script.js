const nameId = document.getElementById("nameId");
const emailId = document.getElementById("emailId");
const phoneId = document.getElementById("phoneId");
const nextStepID = document.getElementById("nextStepId");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");

// Ensure error messages are empty initially
nameError.textContent = "";
emailError.textContent = "";
phoneError.textContent = "";

// Function to validate and show errors
nextStepID.addEventListener("click", (e) => {
  e.preventDefault();
  let isValid = true;

  if (nameId.value.trim() === "") {
    nameError.textContent = "This field is required"; // Show error message
    nameError.classList.remove("hidden-custom"); // Make it visible
    isValid = false;
  } else {
    nameError.textContent = ""; // Hide error message
    nameError.classList.add("hidden-custom");
  }

  if (emailId.value.trim() === "") {
    emailError.textContent = "This field is required";
    emailError.classList.remove("hidden-custom");
    isValid = false;
  } else {
    emailError.textContent = "";
    emailError.classList.add("hidden-custom");
  }

  if (phoneId.value.trim() === "") {
    phoneError.textContent = "This field is required";
    phoneError.classList.remove("hidden-custom");
    isValid = false;
  } else {
    phoneError.textContent = "";
    phoneError.classList.add("hidden-custom");
  }

  if (isValid) {
    alert("Form submitted successfully!");
  }
});
