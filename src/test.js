document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 0;
  const steps = [
    "personal-infoId",
    "form-pageID",
    "toggle-BillingID",
    "finishing-upId",
    "thankyou-Id",
  ];

  const nextStepBtn = document.getElementById("nextStepBtn");
  const nextStepBtn1 = document.getElementById("nextStepBtn1");
  const nextStepBtn2 = document.getElementById("nextStepBtn2");
  const goBackBtn1 = document.getElementById("goBackBtn1");
  const goBackBtn2 = document.getElementById("goBackBtn2");
  const goBackBtn3 = document.getElementById("goBackBtn3");
  const confirmBtn = document.getElementById("confirmBtn");

  const billingToggle = document.getElementById("billing-toggle");

  let selectedPlanPrice = 0;
  let selectedPlanName = "";
  let selectedAddons = [];
  let additionalCost = 0;

  const addonsobj = {
    monthly: [
      { id: "small-storageId-monthly", name: "Small Storage", price: 1 },
      { id: "medium-storageId-monthly", name: "Medium Storage", price: 2 },
      { id: "large-storageId-monthly", name: "Large Storage", price: 2 },
    ],
    yearly: [
      { id: "small-storageId-yearly", name: "Small Storage", price: 10 },
      { id: "medium-storageId-yearly", name: "Medium Storage", price: 20 },
      { id: "large-storageId-yearly", name: "Large Storage", price: 20 },
    ],
  };

  let billingPeriod = "monthly";

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
        { id: "arc-yearly", planName: "Arcade", planPrice: 90 },
        { id: "adv-yearly", planName: "Advanced", planPrice: 120 },
        { id: "pro-yearly", planName: "Pro", planPrice: 150 },
      ],
    },
  ];
  function updateStep() {
    steps.forEach((stepId) => {
      document.getElementById(stepId).classList.add("hidden");
    });

    document.getElementById(steps[currentStep]).classList.remove("hidden");

    document.getElementById("goBackBtn1").classList.add("hidden");
    document.getElementById("goBackBtn2").classList.add("hidden");
    document.getElementById("goBackBtn3").classList.add("hidden");
    document.getElementById("nextStepBtn").classList.add("hidden");
    document.getElementById("nextStepBtn1").classList.add("hidden");
    document.getElementById("nextStepBtn2").classList.add("hidden");
    document.getElementById("confirmBtn").classList.add("hidden");

    if (currentStep === 0) {
      document.getElementById("nextStepBtn").classList.remove("hidden");
    } else if (currentStep === 1) {
      document.getElementById("goBackBtn1").classList.remove("hidden");
      document.getElementById("nextStepBtn1").classList.remove("hidden");
    } else if (currentStep === 2) {
      document.getElementById("goBackBtn2").classList.remove("hidden");
      document.getElementById("nextStepBtn2").classList.remove("hidden");
    } else if (currentStep === 3) {
      document.getElementById("goBackBtn3").classList.remove("hidden");
      document.getElementById("confirmBtn").classList.remove("hidden");
    }
  }

  function validateForm() {
    let isValid = true;

    const nameId = document.getElementById("nameId");
    const emailId = document.getElementById("emailId");
    const phoneId = document.getElementById("phoneId");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");

    if (!nameId.value.trim()) {
      nameError.textContent = "This field is required";
      nameError.classList.remove("hidden");
      nameId.classList.add("error-border");
      isValid = false;
    } else {
      nameError.textContent = "";
      nameError.classList.add("hidden");
      nameId.classList.remove("error-border");
    }

    if (!emailId.value.trim()) {
      emailError.textContent = "This field is required";
      emailError.classList.remove("hidden");
      emailId.classList.add("error-border");
      isValid = false;
    } else {
      emailError.textContent = "";
      emailError.classList.add("hidden");
      emailId.classList.remove("error-border");
    }

    if (!phoneId.value.trim()) {
      phoneError.textContent = "This field is required";
      phoneError.classList.remove("hidden");
      phoneId.classList.add("error-border");
      isValid = false;
    } else {
      phoneError.textContent = "";
      phoneError.classList.add("hidden");
      phoneId.classList.remove("error-border");
    }

    return isValid;
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
        nextStepBtn.disabled = false;
        nextStepBtn1.disabled = false;
      }
    }
  }

  const plans = document.querySelectorAll("input[type='radio']");
  plans.forEach((radio) => {
    radio.addEventListener("change", () => {
      updateSelectedPlan();
    });
  });

  function updateAddons() {
    selectedAddons = [];
    additionalCost = 0;

    const addons = document.querySelectorAll("input[type='checkbox']:checked");
    addons.forEach((addon) => {
      const addonId = addon.id;
      const addonObj = addonsobj[billingPeriod].find((a) => a.id === addonId);
      if (addonObj) {
        selectedAddons.push(addonObj);
        additionalCost += addonObj.price;
      }
    });

    nextStepBtn2.disabled = selectedAddons.length === 0;
  }

  const addons = document.querySelectorAll("input[type='checkbox']");
  addons.forEach((addon) => {
    addon.addEventListener("change", updateAddons);
  });

  if (nextStepBtn) {
    nextStepBtn.addEventListener("click", () => {
      if (currentStep === 0) {
        if (!validateForm()) {
          return;
        }
        currentStep = 1;
        updateStep();
      }
    });
  }

  if (nextStepBtn1) {
    nextStepBtn1.addEventListener("click", () => {
      if (currentStep === 1) {
        currentStep = 2;
        updateStep();
      }
    });
  }

  if (nextStepBtn2) {
    nextStepBtn2.addEventListener("click", () => {
      if (currentStep === 2) {
        currentStep = 3;
        updateStep();
        renderSummary();
      }
    });
  }

  if (goBackBtn1) {
    goBackBtn1.addEventListener("click", () => {
      if (currentStep === 1) {
        currentStep = 0;
        updateStep();
      }
    });
  }

  if (goBackBtn2) {
    goBackBtn2.addEventListener("click", () => {
      if (currentStep === 2) {
        currentStep = 1;
        updateStep();
      }
    });
  }

  if (goBackBtn3) {
    goBackBtn3.addEventListener("click", () => {
      if (currentStep === 3) {
        currentStep = 2;
        updateStep();
      }
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      currentStep = 4;
      updateStep();
    });
  }

  function renderSummary() {
    const totalPrice = selectedPlanPrice + additionalCost;
    const totalPriceElement = document.getElementById("totalPriceDisplay");

    totalPriceElement.innerHTML = `
        <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div class="flex justify-between items-center font-semibold text-gray-900">
                <span>${selectedPlanName} (${
      billingPeriod === "monthly" ? "Monthly" : "Yearly"
    })</span>
                <span class="text-gray-900">$${selectedPlanPrice}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</span>
            </div>
            <a href="#" class="text-blue-600 text-sm underline">Change</a>
            <hr class="my-2 border-gray-300">
            <div id="selectedAddonsSummary" class="text-gray-500">
                ${selectedAddons
                  .map((addon) => {
                    return `
                        <div class="flex justify-between items-center">
                            <span>${addon.name}</span>
                            <span class="text-gray-900">+$${addon.price}/${
                      billingPeriod === "monthly" ? "mo" : "yr"
                    }</span>
                        </div>
                    `;
                  })
                  .join("")}
            </div>
        </div>

        <div class="flex justify-between mt-4 font-semibold text-gray-500">
            <span>Total (per ${
              billingPeriod === "monthly" ? "month" : "year"
            })</span>
            <span class="text-indigo-600 text-lg font-bold">$${totalPrice}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</span>
        </div>
    `;
  }

  updateStep(); // Initialize the first step
});
