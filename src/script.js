document.addEventListener("DOMContentLoaded", function () {
  // Step navigation variables
  const steps = [
    "form-pageID", // Step 1: Personal Info
    "toggle-BillingID", // Step 2: Select Plan
    "add-onsID", // Step 3: Add-ons
    "finishing-upId", // Step 4: Summary
    "thankYouID", // Final Step: Thank You
  ];
  let currentStep = 0;

  // Form validation variables
  const nameId = document.getElementById("nameId");
  const emailId = document.getElementById("emailId");
  const phoneId = document.getElementById("phoneId");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");

  // Buttons for next step and go back
  const nextStepBtn = document.getElementById("nextStepBtn");
  const goBackBtn = document.getElementById("goBackBtn");

  // Plan, billing, add-ons summary variables
  const summaryContainer = document.getElementById("toatlID");
  let selectedPlan = "";
  let selectedBilling = "Monthly";
  let selectedAddOns = [];
  let totalPrice = 0;

  // Update current step
  function updateStep() {
    // Hide all steps
    steps.forEach((stepId) => {
      document.getElementById(stepId).classList.add("hidden");
    });
    // Show the current step
    document.getElementById(steps[currentStep]).classList.remove("hidden");

    // Toggle visibility of the "Go Back" button
    goBackBtn.classList.toggle("hidden", currentStep === 0);
    // Change Next Step button text
    nextStepBtn.textContent =
      currentStep === steps.length - 1 ? "Confirm" : "Next Step";
  }

  // Form validation function
  function validateForm() {
    let isValid = true;

    if (!nameId.value.trim()) {
      nameError.textContent = "This field is required";
      nameError.classList.remove("hidden");
      isValid = false;
    } else {
      nameError.textContent = "";
      nameError.classList.add("hidden");
    }

    if (!emailId.value.trim()) {
      emailError.textContent = "This field is required";
      emailError.classList.remove("hidden");
      isValid = false;
    } else {
      emailError.textContent = "";
      emailError.classList.add("hidden");
    }

    if (!phoneId.value.trim()) {
      phoneError.textContent = "This field is required";
      phoneError.classList.remove("hidden");
      isValid = false;
    } else {
      phoneError.textContent = "";
      phoneError.classList.add("hidden");
    }

    return isValid;
  }

  // Billing toggle function
  function toggleBilling() {
    const yearly = document.getElementById("yearly-plan");
    const monthly = document.getElementById("monthly-plan");
    const toggle = document.getElementById("billing-toggle");
    const addOnCardMonthly = document.getElementById("addOn-card-monthly");
    const addOnCardYearly = document.getElementById("addOn-card-yearly");

    // Check the billing toggle state and show/hide respective plans
    if (toggle.checked) {
      yearly.classList.remove("hidden");
      monthly.classList.add("hidden");
      addOnCardYearly.classList.remove("hidden");
      addOnCardMonthly.classList.add("hidden");
      selectedBilling = "Yearly";
    } else {
      yearly.classList.add("hidden");
      monthly.classList.remove("hidden");
      addOnCardYearly.classList.add("hidden");
      addOnCardMonthly.classList.remove("hidden");
      selectedBilling = "Monthly";
    }
  }

  // Total price calculation
  function calculateTotal() {
    totalPrice = 0;
    selectedAddOns = [];

    const planElement = document.querySelector(".selected-plan");
    if (planElement) {
      selectedPlan = planElement.dataset.plan;
      totalPrice += parseInt(planElement.dataset.price, 10);
    }

    document.querySelectorAll(".addon-checkbox:checked").forEach((checkbox) => {
      selectedAddOns.push(checkbox.dataset.name);
      totalPrice += parseInt(checkbox.dataset.price, 10);
    });

    renderSummary();
  }

  // Render summary of selected plan and add-ons
  function renderSummary() {
    summaryContainer.innerHTML = `
        <div class="flex justify-between">
          <p class="font-bold text-gray-900">${selectedPlan} (${selectedBilling})</p>
          <p class="font-bold text-gray-900">$${totalPrice}/${
      selectedBilling === "Monthly" ? "mo" : "yr"
    }</p>
        </div>
        <button class="text-blue-500 text-sm underline" onclick="changePlan()">Change</button>
        <div class="mt-4">${selectedAddOns
          .map(
            (addon) =>
              `<div class="flex justify-between text-gray-700"><p>${addon}</p></div>`
          )
          .join("")}</div>
        <div class="flex justify-between text-gray-500 text-sm mt-4">
          <span>Total (${selectedBilling})</span>
          <span class="font-bold text-blue-500 text-lg">$${totalPrice}/${
      selectedBilling === "Monthly" ? "mo" : "yr"
    }</span>
        </div>
      `;
  }

  // Add event listeners for next, go back, and form validation
  nextStepBtn.addEventListener("click", () => {
    if (currentStep === 0 && !validateForm()) {
      return;
    }

    if (currentStep < steps.length - 1) {
      currentStep++;
      updateStep();
    }
  });

  goBackBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      updateStep();
    }
  });

  // Add event listeners for plan and add-on selections
  document.querySelectorAll(".plan-option").forEach((plan) => {
    plan.addEventListener("click", function () {
      document
        .querySelectorAll(".plan-option")
        .forEach((p) => p.classList.remove("selected-plan"));
      this.classList.add("selected-plan");
      calculateTotal();
    });
  });

  document.querySelectorAll(".addon-checkbox").forEach((addon) => {
    addon.addEventListener("change", calculateTotal);
  });

  document
    .getElementById("billing-toggle")
    .addEventListener("change", function () {
      toggleBilling();
      calculateTotal();
    });

  // Initialize the first step and billing toggle
  updateStep(); // Ensure first step is shown
  toggleBilling(); // Ensure billing is toggled correctly
});
