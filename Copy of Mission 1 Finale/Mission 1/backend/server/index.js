// const express = require('express');
// const server = express();
// server.use(express.json());

// const port = process.env.PORT || 4000;
// //setting up server inside terminal
// server.listen(port, () => {
//   console.log('Server listening on port 4000 Happy Coding');
// });

// app.get('/', (req, res) => {
//   res.send('Hello world!');
// });

const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const port = process.env.PORT || 4000;
// API 1
const calculateCarValue = (input) => {
  const { model, year } = input;

  if (!model || !year || isNaN(year)) {
    return { error: 'Invalid input. Please provide valid model and year.' };
  }

  const parsedYear = parseInt(year);

  if (parsedYear < 0 || parsedYear > 2023) {
    return {
      error: 'Invalid year. Year must be a non-negative number up to 2023.',
    };
  }

  const getPositionOfAlphabet = (letter) =>
    letter.toUpperCase().charCodeAt(0) - 64;

  const cleanedModel = model.replace(/[^A-Za-z]/g, '');
  const positionSum = [...cleanedModel].reduce(
    (sum, letter) => sum + getPositionOfAlphabet(letter),
    0
  );

  const carValue = positionSum * 100 + parsedYear;

  return { car_value: carValue };
};

app.use(express.json());

app.post(
  '/calculateCarValue',
  [
    body('model').notEmpty().isString(),
    body('year').notEmpty().isInt({ min: 0, max: 2023 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const input = req.body;
    const output = calculateCarValue(input);
    res.json(output);
  }
);
// End of API 1

//API 2

function getRiskInfo(description) {
  const keywordToRiskMap = {
    collide: { rating: 4, description: 'Moderate high risk driver' },
    scratch: { rating: 1, description: 'Low risk driver' },
    bump: { rating: 2, description: 'Minor risk driver' },
    crash: { rating: 5, description: 'High risk driver' },
    smash: { rating: 3, description: 'Moderate risk driver' },
  };

  const words = description.toLowerCase().split(/\W+/);

  let totalWeightedRating = 0;
  let totalWeight = 0;

  words.forEach((word, index) => {
    if (keywordToRiskMap[word]) {
      const weight = 1 / Math.abs(index - words.length / 2 + 0.5);
      totalWeightedRating += keywordToRiskMap[word].rating * weight;
      totalWeight += weight;
    }
  });

  if (totalWeight === 0) {
    return 'No relevant keywords found in description';
  }

  const averageWeightedRating = totalWeightedRating / totalWeight;

  let closestRating = Math.round(averageWeightedRating);
  closestRating = Math.min(Math.max(1, closestRating), 5);

  return {
    rating: closestRating,
    description:
      keywordToRiskMap[Object.keys(keywordToRiskMap)[closestRating - 1]]
        .description,
  };
}

app.post('/calculateRiskRating', (req, res) => {
  const { description } = req.body;

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'There is an error' });
  }

  const riskInfo = getRiskInfo(description);

  res.json({ rating: riskInfo.rating });
});
////////END of API Excercise 2///////////////////

// Function to calculate yearly premium
function calculateYearlyPremium(carValue, scale) {
  return (carValue * scale) / 100;
}

// Function to calculate monthly premium
function calculateMonthlyPremium(yearlyPremium) {
  return yearlyPremium / 12;
}

app.post('/calculatemonthlyandyearlypremium', (req, res) => {
  const carValue = parseFloat(req.body.carValue);
  const riskRating = parseFloat(req.body.riskRating);

  if (isNaN(carValue) || isNaN(riskRating)) {
    return res
      .status(400)
      .json({ error: 'There is an error please check your inputs 😃' });
  }

  const yearlyPremium = calculateYearlyPremium(carValue, riskRating);
  const monthlyPremium = calculateMonthlyPremium(yearlyPremium);

  const response = {
    monthly_premium: monthlyPremium.toFixed(2),
    yearly_premium: yearlyPremium.toFixed(1),
  };

  res.json(response);
});
///////END OF API 3/////////////////////
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
