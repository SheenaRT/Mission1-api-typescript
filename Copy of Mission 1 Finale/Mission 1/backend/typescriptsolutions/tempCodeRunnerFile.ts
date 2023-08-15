type RiskData = {
    [key: string]: { rating: number, description: string }
};

const riskData: RiskData = {
    collide: { rating: 4, description: 'Moderate high risk driver' },
    scratch: { rating: 1, description: 'Low risk driver' },
    bump: { rating: 2, description: 'Minor risk driver' },
    crash: { rating: 5, description: 'High risk driver' },
    smash: { rating: 3, description: 'Moderate risk driver' }
};

function calculateRisk(sentence: string, carValue: number): { monthly: number, yearly: number } {
    const words = sentence.toLowerCase().split(' ');
    let totalRiskRating = 0;

    for (const word of words) {
        if (riskData.hasOwnProperty(word)) {
            totalRiskRating += riskData[word].rating;
        }
    }

    const calculatedValue = carValue * (totalRiskRating / 100);
    const monthlyPayment = calculatedValue / 12;
    const yearlyPremium = calculatedValue;

    return { monthly: monthlyPayment, yearly: yearlyPremium };
}

// Example usage:
const sentence = "I had a crash ";
const carValue = 4000; // Example car value
const { monthly, yearly } = calculateRisk(sentence, carValue);
console.log(`Monthly payment: $${monthly.toFixed(2)}`);
console.log(`Yearly premium: $${yearly.toFixed(2)}`);
