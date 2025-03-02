document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 0;
  const steps = [
    "form-pageID", // Step 1
    "toggle-BillingID", // Step 2
    "finishing-upId", // Step 4
  ];
  const nextStepBtn1 = document.getElementById("nextStepBtn1"); // Button for Step 1
  const nextStepBtn2 = document.getElementById("nextStepBtn2"); // Button for Step 2
  const confirmBtn = document.getElementById("confirmBtn");

  // Variables to store the prices and selected plan
  let selectedPlanPrice = 0;
  let additionalCost = 0;
  let selectedPlanName = "";
  let billingPeriod = "yearly"; // Default billing period is yearly

  // Function to update the step
  function updateStep() {
    // Hide all steps
    steps.forEach((stepId) => {
      document.getElementById(stepId).classList.add("hidden");
    });
    // Show the current step
    document.getElementById(steps[currentStep]).classList.remove("hidden");
  }

  // Function to toggle between monthly and yearly plans
  function toggleBilling() {
    const yearly = document.getElementById("yearly-plan");
    const monthly = document.getElementById("monthly-plan");
    const toggle = document.getElementById("billing-toggle");

    if (toggle.checked) {
      billingPeriod = "monthly";
      yearly.classList.add("hidden");
      monthly.classList.remove("hidden");
    } else {
      billingPeriod = "yearly";
      yearly.classList.remove("hidden");
      monthly.classList.add("hidden");
    }
  }

  // Step 1: User selects the plan
  const plans = document.querySelectorAll(".plan");
  plans.forEach((plan) => {
    plan.addEventListener("click", () => {
      // Remove 'selected' class from all plans
      plans.forEach((p) => p.classList.remove("selected"));
      // Add 'selected' class to the clicked plan
      plan.classList.add("selected");

      // Get the price from the selected plan based on billing type
      if (billingPeriod === "monthly") {
        selectedPlanPrice = parseFloat(plan.dataset.monthlyPrice); // Use monthly price
      } else {
        selectedPlanPrice = parseFloat(plan.dataset.yearlyPrice); // Use yearly price
      }

      // Get the plan name based on the plan selected (using id for unique identification)
      if (plan.id === "arc-m" || plan.id === "arc-yearly") {
        selectedPlanName = "Arcade"; // Arcade
      } else if (plan.id === "adv-m" || plan.id === "adv-yearly") {
        selectedPlanName = "Advanced"; // Advanced
      } else if (plan.id === "pro-m" || plan.id === "pro-yearly") {
        selectedPlanName = "Pro"; // Pro
      }

      // Enable the Next Step button after selecting a plan
      nextStepBtn1.disabled = false;
    });
  });

  // Step 2: User selects add-ons (checkboxes for multiple selection)
  const checkboxes = document.querySelectorAll(
    "#toggle-BillingID input[type='checkbox']"
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      // Reset additionalCost each time a change happens
      additionalCost = 0;
      const selectedAddons = [];

      // Calculate additional cost based on selected checkboxes
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          additionalCost += parseFloat(checkbox.dataset.price); // Add the price for selected add-ons
          selectedAddons.push({
            name: checkbox.parentElement.textContent.split("+")[0].trim(), // Extract addon name
            price: checkbox.dataset.price, // Extract addon price
          });
        }
      });

      // Enable the Next Step button after selecting at least one add-on
      nextStepBtn2.disabled = additionalCost === 0;

      // Display the names and prices of selected add-ons in the summary
      document.getElementById("selectedAddons").innerHTML = selectedAddons
        .map((addon) => `<p>${addon.name} $${addon.price}</p>`)
        .join("");
    });
  });

  // Button for Next Step (Step 1)
  nextStepBtn1.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateStep();
    }
  });

  // Button for Next Step (Step 2)
  nextStepBtn2.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateStep();
    }
  });

  // Calculate and display total price in the summary page (Step 4)
  function renderSummary() {
    const totalPrice = selectedPlanPrice + additionalCost;
    const totalPriceElement = document.getElementById("totalPriceDisplay");

    // Display the selected plan name, its price, the additional cost, and the total price
    totalPriceElement.innerHTML = `
              <p>You selected the <strong>"${selectedPlanName}"</strong> plan (${
      billingPeriod === "monthly" ? "Monthly" : "Yearly"
    } billing).</p>
              <p>Plan price: $${selectedPlanPrice}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
              <p>Additional cost: $${additionalCost}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
              <p>Total price: $${totalPrice}/${
      billingPeriod === "monthly" ? "mo" : "yr"
    }</p>
              <p>Selected Add-ons:</p>
              <div id="selectedAddons"></div> <!-- This will contain the add-ons -->
            `;
  }

  // Confirm Button Logic (Step 4)
  confirmBtn.addEventListener("click", () => {
    const totalPrice = selectedPlanPrice + additionalCost;
    alert(`Form submitted! Total price: $${totalPrice}`);
  });

  // Initialize first step
  updateStep();

  // Render summary when transitioning to Step 4
  nextStepBtn2.addEventListener("click", () => {
    if (currentStep === 2) {
      renderSummary(); // Update the summary with selected plan and total
    }
  });

  // Initialize toggle behavior on page load
  const toggle = document.getElementById("billing-toggle");
  toggle.addEventListener("change", toggleBilling);
  toggleBilling(); // Initialize billing state based on the checkbox status
});
