document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 0;
  const steps = ["form-pageID", "toggle-BillingID", "finishing-upId"];
  const nextStepBtn1 = document.getElementById("nextStepBtn1");
  const nextStepBtn2 = document.getElementById("nextStepBtn2");
  const confirmBtn = document.getElementById("confirmBtn");
  const billingToggle = document.getElementById("billing-toggle");

  let selectedPlanPrice = 0;
  let selectedPlanName = "";
  let selectedAddons = [];
  let additionalCost = 0;

  let addonsobj = {
    monthly: [
      { id: "small-storageId-monthly", name: "Small Storage", price: 2 },
      { id: "medium-storageId-monthly", name: "Medium Storage", price: 4 },
      { id: "large-storageId-monthly", name: "Large Storage", price: 6 },
    ],
    yearly: [
      { id: "small-storageId-yearly", name: "Small Storage", price: 10 },
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

  function updateStep() {
    steps.forEach((stepId) => {
      document.getElementById(stepId).classList.add("hidden");
    });
    document.getElementById(steps[currentStep]).classList.remove("hidden");

    // Always enable nextStepBtn2 when reaching step 2
    if (currentStep === 1) {
      nextStepBtn2.disabled = false;
    }
  }

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

  function handleCheckboxChange(event) {
    const checkboxId = event.target.id;
    const checkboxChecked = event.target.checked;

    const addon = addonsobj[billingPeriod].find((a) => a.id === checkboxId);

    if (addon) {
      if (checkboxChecked) {
        additionalCost += addon.price;
        selectedAddons.push({ name: addon.name, price: addon.price });
      } else {
        additionalCost -= addon.price;
        selectedAddons = selectedAddons.filter(
          (selectedAddon) => selectedAddon.name !== addon.name
        );
      }
    }

    updateAddonsDisplay();
  }

  function updateAddonsDisplay() {
    const selectedAddonsDisplay = document.getElementById("selectedAddons");
    selectedAddonsDisplay.innerHTML = selectedAddons
      .map((addon) => `<p>${addon.name} (+$${addon.price})</p>`)
      .join("");
  }

  addonsobj.monthly.forEach((addon) => {
    const element = document.getElementById(addon.id);
    if (element) {
      element.addEventListener("change", handleCheckboxChange);
    }
  });

  addonsobj.yearly.forEach((addon) => {
    const element = document.getElementById(addon.id);
    if (element) {
      element.addEventListener("change", handleCheckboxChange);
    }
  });

  if (nextStepBtn1) {
    nextStepBtn1.addEventListener("click", () => {
      if (currentStep === 0) {
        currentStep = 1;
        updateStep();
      }
    });
  }

  if (nextStepBtn2) {
    nextStepBtn2.addEventListener("click", () => {
      if (currentStep === 1) {
        currentStep = 2;
        updateStep();
        renderSummary();
      }
    });
  }

  function renderSummary() {
    const totalPrice = selectedPlanPrice + additionalCost;
    const totalPriceElement = document.getElementById("totalPriceDisplay");

    totalPriceElement.innerHTML = `
      <p><strong>${selectedPlanName} (${
      billingPeriod === "monthly" ? "Monthly" : "Yearly"
    } )</strong></p>
      <p>Plan price: $${selectedPlanPrice}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
      <div id="selectedAddonsSummary">${selectedAddons
        .map((addon) => `<p>${addon.name} (+$${addon.price})</p>`)
        .join("")}</div>
      
      <p>Total price: $${totalPrice}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
    `;
  }

  updateStep(); // Initialize the first step
});
