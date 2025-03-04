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
    const selectedRadio = document.querySelector(
      "input[type='radio'].plan-radio:checked"
    );

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

  const plans = document.querySelectorAll("input[type='radio'].plan-radio");
  plans.forEach((radio) => {
    radio.addEventListener("change", () => {
      plans.forEach((r) =>
        r.parentElement.querySelector("p").classList.remove("selected")
      );
      radio.parentElement.querySelector("p").classList.add("selected");

      updateSelectedPlan();
    });
  });

  // Button clicks for moving to the next step
  if (nextStepBtn) {
    nextStepBtn.addEventListener("click", () => {
      console.log("Next Step 0 Button clicked");
      if (currentStep === 0) {
        currentStep = 1;
        updateStep();
      }
    });
  }

  if (nextStepBtn1) {
    nextStepBtn1.addEventListener("click", () => {
      console.log("Next Step 1 Button clicked");
      if (currentStep === 1) {
        currentStep = 2; // Proceed to Step 2
        updateStep();
      }
    });
  }

  if (nextStepBtn2) {
    nextStepBtn2.addEventListener("click", () => {
      console.log("Next Step 2 Button clicked");
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
      console.log("Confirm Button clicked");
      currentStep = 4; // Proceed to Step 5 (Thank You)
      updateStep(); // Move to Step 5
    });
  }
  // Go back button for step 1
  if (goBackBtn1) {
    goBackBtn1.addEventListener("click", () => {
      console.log("Go Back Button clicked");
      if (currentStep === 1) {
        currentStep = 0; // Go back to Step 0
        updateStep();
      }
    });
  }

  // Go back button for step 2
  if (goBackBtn2) {
    goBackBtn2.addEventListener("click", () => {
      console.log("Go Back Button 2 clicked");
      if (currentStep === 2) {
        currentStep = 1; // Go back to Step 1
        updateStep();
      }
    });
  }

  // Go back button for step 3
  if (goBackBtn3) {
    goBackBtn3.addEventListener("click", () => {
      console.log("Go Back Button 2 clicked");
      if (currentStep === 3) {
        currentStep = 2; // Go back to Step 2
        updateStep();
      }
    });
  }

  function updateSelectedAddons() {
    const selectedAddonsArray = [];
    const selectedAddonCheckboxes = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );

    selectedAddonCheckboxes.forEach((checkbox) => {
      const addonId = checkbox.id;

      // Get addon data from addonsobj using addonId
      const addonDetails = addonsobj[billingPeriod].find(
        (addon) => addon.id === addonId
      );

      if (addonDetails) {
        // Push the addon data (id, name, price) to selectedAddonsArray
        selectedAddonsArray.push({
          id: addonDetails.id,
          name: addonDetails.name,
          price: addonDetails.price,
        });
      }
    });

    // Update selected add-ons and calculate additional cost
    selectedAddons = selectedAddonsArray;
    additionalCost = selectedAddons.reduce(
      (total, addon) => total + addon.price,
      0
    );

    // Enable or disable the Next Step 2 button based on addon selection
    nextStepBtn2.disabled = selectedAddons.length === 0;

    // Render the updated summary after addon selection
    renderSummary();
  }
  // Add event listeners for add-on checkboxes
  const addonCheckboxes = document.querySelectorAll(
    "input[type='checkbox'][data-price]"
  );
  addonCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateSelectedAddons);
  });

  function renderSummary() {
    const totalPrice = selectedPlanPrice + additionalCost;
    const totalPriceElement = document.getElementById("totalPriceDisplay");

    // Render the plan summary (name, price, and billing period)
    totalPriceElement.innerHTML = `
      <p><strong>${selectedPlanName} (${
      billingPeriod === "monthly" ? "Monthly" : "Yearly"
    })</strong></p>
      <p>Plan price: $${selectedPlanPrice}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
      <div id="selectedAddonsSummary">${selectedAddons
        .map((addon) => {
          return `<p>${addon.name} +$${addon.price}/${
            billingPeriod === "monthly" ? "mo" : "yr"
          }</p>`;
        })
        .join("")}</div>
      <p>Total price: $${totalPrice}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
    `;
  }

  updateStep(); // Initialize the first step
});
