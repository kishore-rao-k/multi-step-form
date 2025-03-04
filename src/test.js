document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 0;
  const steps = [
    "personal-infoId",
    "form-pageID",
    "toggle-BillingID",
    "finishing-upId",
    "thankyou-Id",
  ];

  // Buttons
  const nextStepBtn = document.getElementById("nextStepBtn");
  const nextStepBtn1 = document.getElementById("nextStepBtn1");
  const nextStepBtn2 = document.getElementById("nextStepBtn2");
  const goBackBtn1 = document.getElementById("goBackBtn1");
  const goBackBtn2 = document.getElementById("goBackBtn2");
  const confirmBtn = document.getElementById("confirmBtn");

  // Billing period toggle
  const billingToggle = document.getElementById("billing-toggle");

  let selectedPlanPrice = 0;
  let selectedPlanName = "";
  let selectedAddons = [];
  let additionalCost = 0;

  const addonsobj = {
    monthly: [
      { id: "small-storageId-monthly", name: "Small Storage", price: 2 },
      { id: "medium-storageId-monthly", name: "Medium Storage", price: 4 },
      { id: "large-storageId-monthly", name: "Large Storage", price: 6 },
    ],
    yearly: [
      { id: "small-storageId-yearly", name: "Small Storage", price: 12 },
      { id: "medium-storageId-yearly", name: "Medium Storage", price: 14 },
      { id: "large-storageId-yearly", name: "Large Storage", price: 16 },
    ],
  };

  let billingPeriod = "monthly"; // Default billing period

  const plansobj = [
    {
      billingPeriod: "monthly",
      plans: [
        { id: "arc-m", planName: "Arcade", planPrice: 9 },
        { id: "adv-m", planName: "Advanced", planPrice: 12 },
        { id: "pro-m", planName: "Pro", planPrice: 15 },
      ],
    },
    {
      billingPeriod: "yearly",
      plans: [
        { id: "arc-yearly", planName: "Arcade", planPrice: 1000 },
        { id: "adv-yearly", planName: "Advanced", planPrice: 1500 },
        { id: "pro-yearly", planName: "Pro", planPrice: 2000 },
      ],
    },
  ];

  // Step visibility and button control
  function updateStep() {
    // Hide all the steps
    steps.forEach((stepId) => {
      document.getElementById(stepId).classList.add("hidden");
    });

    // Show the current step
    document.getElementById(steps[currentStep]).classList.remove("hidden");

    // Hide all Next buttons and confirm button
    nextStepBtn.style.display = "none";
    nextStepBtn1.style.display = "none";
    nextStepBtn2.style.display = "none";
    goBackBtn1.style.display = "none";
    goBackBtn2.style.display = "none";
    confirmBtn.style.display = "none";

    // Show the relevant "Next Step" and "Go Back" buttons based on currentStep
    if (currentStep === 0) {
      nextStepBtn.style.display = "inline-block"; // Show "Next Step"
      nextStepBtn.disabled = false; // Enable nextStepBtn when on Step 0
    } else if (currentStep === 1) {
      nextStepBtn1.style.display = "inline-block"; // Show "Next Step 1"
      goBackBtn1.style.display = "inline-block"; // Show "Go Back"
      nextStepBtn1.disabled = false; // Enable nextStepBtn1 once a plan is selected
    } else if (currentStep === 2) {
      nextStepBtn2.style.display = "inline-block"; // Show "Next Step 2"
      goBackBtn2.style.display = "inline-block"; // Show "Go Back 2"
      nextStepBtn2.disabled = false; // Enable nextStepBtn2 once a plan is selected
    } else if (currentStep === 3) {
      confirmBtn.style.display = "inline-block"; // Show "Confirm" button
    }
  }

  // Form validation function with red border for invalid fields
  function validateForm() {
    let isValid = true;

    // Personal Info Validation
    const nameId = document.getElementById("nameId");
    const emailId = document.getElementById("emailId");
    const phoneId = document.getElementById("phoneId");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");

    // Validate Name
    if (!nameId.value.trim()) {
      nameError.textContent = "This field is required";
      nameError.classList.remove("hidden");
      nameId.classList.add("error-border"); // Add red border
      isValid = false;
    } else {
      nameError.textContent = "";
      nameError.classList.add("hidden");
      nameId.classList.remove("error-border"); // Remove red border
    }

    // Validate Email
    if (!emailId.value.trim()) {
      emailError.textContent = "This field is required";
      emailError.classList.remove("hidden");
      emailId.classList.add("error-border"); // Add red border
      isValid = false;
    } else {
      emailError.textContent = "";
      emailError.classList.add("hidden");
      emailId.classList.remove("error-border"); // Remove red border
    }

    // Validate Phone
    if (!phoneId.value.trim()) {
      phoneError.textContent = "This field is required";
      phoneError.classList.remove("hidden");
      phoneId.classList.add("error-border"); // Add red border
      isValid = false;
    } else {
      phoneError.textContent = "";
      phoneError.classList.add("hidden");
      phoneId.classList.remove("error-border"); // Remove red border
    }

    return isValid;
  }

  // Step visibility and button control
  function updateStep() {
    // Hide all the steps
    steps.forEach((stepId) => {
      document.getElementById(stepId).classList.add("hidden");
    });

    // Show the current step
    document.getElementById(steps[currentStep]).classList.remove("hidden");

    // Hide all Next buttons and confirm button
    nextStepBtn.style.display = "none";
    nextStepBtn1.style.display = "none";
    nextStepBtn2.style.display = "none";
    goBackBtn1.style.display = "none";
    goBackBtn2.style.display = "none";
    confirmBtn.style.display = "none";

    // Show the relevant "Next Step" and "Go Back" buttons based on currentStep
    if (currentStep === 0) {
      nextStepBtn.style.display = "inline-block"; // Show "Next Step"
      nextStepBtn.disabled = false; // Enable nextStepBtn when on Step 0
    } else if (currentStep === 1) {
      nextStepBtn1.style.display = "inline-block"; // Show "Next Step 1"
      goBackBtn1.style.display = "inline-block"; // Show "Go Back"
      nextStepBtn1.disabled = false; // Enable nextStepBtn1 once a plan is selected
    } else if (currentStep === 2) {
      nextStepBtn2.style.display = "inline-block"; // Show "Next Step 2"
      goBackBtn2.style.display = "inline-block"; // Show "Go Back 2"
      nextStepBtn2.disabled = false; // Enable nextStepBtn2 once a plan is selected
    } else if (currentStep === 3) {
      confirmBtn.style.display = "inline-block"; // Show "Confirm" button
    }
  }

  // Toggle between monthly and yearly plans
  function toggleBilling() {
    const monthlyPlan = document.getElementById("monthly-plan");
    const yearlyPlan = document.getElementById("yearly-plan");
    const addOnCardMonthly = document.getElementById("addOn-card-monthly");
    const addOnCardYearly = document.getElementById("addOn-card-yearly");

    if (billingToggle.checked) {
      billingPeriod = "yearly";
      yearlyPlan.classList.remove("hidden");
      monthlyPlan.classList.add("hidden");
      addOnCardYearly.classList.remove("hidden");
      addOnCardMonthly.classList.add("hidden");
    } else {
      billingPeriod = "monthly";
      yearlyPlan.classList.add("hidden");
      monthlyPlan.classList.remove("hidden");
      addOnCardYearly.classList.add("hidden");
      addOnCardMonthly.classList.remove("hidden");
    }
    updateSelectedPlan();
  }

  if (billingToggle) {
    billingToggle.addEventListener("change", toggleBilling);
    toggleBilling();
  }

  // Handle plan selection
  function updateSelectedPlan() {
    const selectedRadio = document.querySelector("input[type='radio']:checked");
    if (selectedRadio) {
      const selectedPlanId = selectedRadio.id;
      const selectedBillingPeriod = billingPeriod;

      const selectedPlan = plansobj
        .find((plan) => plan.billingPeriod === selectedBillingPeriod)
        .plans.find((plan) => plan.id === selectedPlanId);

      if (selectedPlan) {
        selectedPlanPrice = selectedPlan.planPrice;
        selectedPlanName = selectedPlan.planName;
        nextStepBtn.disabled = false; // Enable nextStepBtn once a plan is selected
        nextStepBtn1.disabled = false; // Enable nextStepBtn1 once a plan is selected
      }
    }
  }

  // Add event listeners for plan selection
  const plans = document.querySelectorAll("input[type='radio']");
  plans.forEach((radio) => {
    radio.addEventListener("change", () => {
      updateSelectedPlan();
    });
  });

  // Button clicks for moving to the next step
  if (nextStepBtn) {
    nextStepBtn.addEventListener("click", () => {
      if (currentStep === 0) {
        if (!validateForm()) {
          return; // Stop if validation fails
        }
        currentStep = 1;
        updateStep();
      }
    });
  }

  if (nextStepBtn1) {
    nextStepBtn1.addEventListener("click", () => {
      if (currentStep === 1) {
        currentStep = 2; // Proceed to Step 2
        updateStep();
      }
    });
  }

  if (nextStepBtn2) {
    nextStepBtn2.addEventListener("click", () => {
      if (currentStep === 2) {
        currentStep = 3; // Proceed to Step 3 (Summary)
        updateStep();
        renderSummary(); // Make sure to render the summary after step 3
      }
    });
  }

  // Confirm button click to go to Step 5
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      currentStep = 4; // Proceed to Step 5 (Thank You)
      updateStep(); // Move to Step 5
    });
  }

  function renderSummary() {
    const totalPrice = selectedPlanPrice + additionalCost;
    const totalPriceElement = document.getElementById("totalPriceDisplay");

    totalPriceElement.innerHTML = `
        <p><strong>${selectedPlanName} (${
      billingPeriod === "monthly" ? "Monthly" : "Yearly"
    })</strong></p>
        <p>Plan price: $${selectedPlanPrice} / ${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
        <div id="selectedAddonsSummary">${selectedAddons
          .map((addon) => {
            return `<p>${addon.name} +$${addon.price} / ${
              billingPeriod === "monthly" ? "mo" : "yr"
            }</p>`;
          })
          .join("")}</div>
        <p>Total price: $${totalPrice} / ${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
      `;
  }

  updateStep(); // Initialize the first step
});
