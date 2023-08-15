// Function to calculate yearly premium
function calculateYearlyPremium(carValue, scale) {
  return (carValue * scale) / 100;
}

// Function to calculate monthly premium
function calculateMonthlyPremium(yearlyPremium) {
  return yearlyPremium / 12;
}

// Example car value and scale
const carValue = 6614; // Replace with the actual car value
const scale = 5; // Replace with the desired scale

// Calculate premiums
const yearlyPremium = calculateYearlyPremium(carValue, scale);
const monthlyPremium = calculateMonthlyPremium(yearlyPremium);

// Print the results
console.log(`Car_Value: $${carValue}`);
console.log(`Risk_Rating: $${scale}`);
console.log(`Monthly Premium: $${monthlyPremium.toFixed(2)}`);
console.log(`Yearly Premium: $${yearlyPremium.toFixed(1)}`);
