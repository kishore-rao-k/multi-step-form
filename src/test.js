document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 0;
  const steps = ["form-pageID", "toggle-BillingID", "finishing-upId"];
  const nextStepBtn1 = document.getElementById("nextStepBtn1");
  const nextStepBtn2 = document.getElementById("nextStepBtn2");
  const confirmBtn = document.getElementById("confirmBtn");
  const billingToggle = document.getElementById("billing-toggle");

  let selectedPlanPrice = 0;
  let selectedPlanName = "";
  let billingPeriod = "yearly"; // Default billing period

  function updateStep() {
    steps.forEach((stepId) => {
      document.getElementById(stepId).classList.add("hidden");
    });
    document.getElementById(steps[currentStep]).classList.remove("hidden");
  }

  // Function to toggle between monthly and yearly plans
  function toggleBilling() {
    const yearly = document.getElementById("yearly-plan");
    const monthly = document.getElementById("monthly-plan");

    if (billingToggle.checked) {
      billingPeriod = "monthly";
      yearly.classList.add("hidden");
      monthly.classList.remove("hidden");
    } else {
      billingPeriod = "yearly";
      yearly.classList.remove("hidden");
      monthly.classList.add("hidden");
    }

    // Update the selected plan price based on the new billing period
    const selectedRadio = document.querySelector(
      "input[type='radio'].plan-radio:checked"
    );
    if (selectedRadio) {
      selectedPlanPrice =
        billingPeriod === "monthly"
          ? parseFloat(selectedRadio.dataset.monthlyPrice)
          : parseFloat(selectedRadio.dataset.yearlyPrice);
    }
  }

  // Step 1: User selects the plan using radio buttons
  const plans = document.querySelectorAll("input[type='radio'].plan-radio");
  plans.forEach((radio) => {
    radio.addEventListener("change", () => {
      // Remove 'selected' class from all plans
      plans.forEach((r) =>
        r.parentElement.querySelector("p").classList.remove("selected")
      );
      // Add 'selected' class to the clicked plan's name
      radio.parentElement.querySelector("p").classList.add("selected");

      // Get the price from the selected plan based on billing type
      selectedPlanPrice =
        billingPeriod === "monthly"
          ? parseFloat(radio.dataset.monthlyPrice)
          : parseFloat(radio.dataset.yearlyPrice);

      // Get the plan name based on the radio button selected
      selectedPlanName = radio.dataset.name; // Arcade, Advanced, Pro

      // Enable the Next Step button after selecting a plan
      nextStepBtn1.disabled = false;
    });
  });

  // Attach event listener to the billing toggle switch
  if (billingToggle) {
    billingToggle.addEventListener("change", toggleBilling);
    toggleBilling(); // Initialize toggle state on load
  }

  // Add event listener for nextStepBtn1 (Step 1 -> Step 2)
  if (nextStepBtn1) {
    nextStepBtn1.addEventListener("click", () => {
      if (currentStep === 0) {
        currentStep = 1; // Transition to Step 2
        updateStep();
      }
    });
  }

  // Step 2: User selects add-ons (checkboxes for multiple selection)
  const addons = [
    { id: "small-storageId", addOnName: "Small Storage", price: 2 },
    { id: "medium-storageId", addOnName: "Medium Storage", price: 4 },
    { id: "large-storageId", addOnName: "Large Storage", price: 6 },
  ];

  let additionalCost = 0;
  let selectedAddons = [];

  // Function to handle checkbox change events
  function handleCheckboxChange(event) {
    const checkboxId = event.target.id; // Get the id of the clicked checkbox
    const checkboxChecked = event.target.checked; // Whether the checkbox is checked

    // Find the corresponding addon from the addons array using the checkbox id
    const addon = addons.find((a) => a.id === checkboxId);

    if (addon) {
      if (checkboxChecked) {
        // If the checkbox is checked, add the add-on to the selectedAddons list and update the cost
        additionalCost += addon.price;
        selectedAddons.push({ name: addon.addOnName, price: addon.price });
      } else {
        // If the checkbox is unchecked, remove the add-on from the selectedAddons list and update the cost
        additionalCost -= addon.price;
        selectedAddons = selectedAddons.filter(
          (selectedAddon) => selectedAddon.name !== addon.addOnName
        );
      }
    }

    // Enable the next step button if any add-on is selected
    nextStepBtn2.disabled = selectedAddons.length === 0;

    // Display selected add-ons
    updateAddonsDisplay();
    console.log(`Total Additional Cost: $${additionalCost}/mo`);
  }

  // Function to update the display of selected add-ons
  function updateAddonsDisplay() {
    document.getElementById("selectedAddons").innerHTML = selectedAddons
      .map((addon) => `<p>${addon.name} $${addon.price}/mo</p>`)
      .join("");
  }

  // Add event listeners to each checkbox
  addons.forEach((addon) => {
    const element = document.getElementById(addon.id);
    if (element) {
      element.addEventListener("change", handleCheckboxChange);
    }
  });

  // Button for Next Step (Step 2 -> Step 4)
  nextStepBtn2.addEventListener("click", () => {
    if (currentStep === 1) {
      currentStep = 2; // Transition to Step 4
      updateStep();

      // Update the summary with selected add-ons when moving to Step 4
      renderSummary();
    }
  });

  // Function to update the current step visibility
  function updateStep() {
    steps.forEach((stepId) => {
      document.getElementById(stepId).classList.add("hidden");
    });
    document.getElementById(steps[currentStep]).classList.remove("hidden");
  }

  // Render the summary for Step 4
  function renderSummary() {
    const totalPrice = selectedPlanPrice + additionalCost; // Total price includes plan + add-ons
    const totalPriceElement = document.getElementById("totalPriceDisplay");

    // Display selected plan, add-ons, and total price in the summary
    totalPriceElement.innerHTML = `
          <p>You selected the <strong>"${selectedPlanName}"</strong> plan (${
      billingPeriod === "monthly" ? "Monthly" : "Yearly"
    } billing).</p>
        <p>Plan price: $${selectedPlanPrice}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
        <p>Selected Add-ons:</p>
        <div id="selectedAddonsSummary">${selectedAddons
          .map((addon) => `<p>${addon.name} $${addon.price}/mo</p>`)
          .join("")}</div>
        <p>Total additional cost: $${additionalCost}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
        <p>Total price: $${totalPrice}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
        `;
  }

  // Confirm Button Logic (Step 4)
  confirmBtn.addEventListener("click", () => {
    const totalPrice = selectedPlanPrice + additionalCost;
    alert(`Form submitted! Total price: $${totalPrice}`);
  });

  // Initialize the first step
  updateStep();

  // Render summary when transitioning to Step 4
  nextStepBtn2.addEventListener("click", () => {
    if (currentStep === 2) {
      renderSummary(); // Update the summary with selected plan and total
    }
  });

  // Initialize toggle behavior on page load
  const toggle = document.getElementById("billing-toggle");
  toggle.addEventListener("change", toggleBilling); // Attach toggleBilling event
  toggleBilling(); // Initialize billing state based on the checkbox status
});
