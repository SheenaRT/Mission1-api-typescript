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
    return 'There is an error';
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

const description = 'My car got collide and crash';
const riskInfo = getRiskInfo(description);

console.log('Risk Rating:', riskInfo.rating);
