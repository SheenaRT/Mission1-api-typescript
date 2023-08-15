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
    letter.toUpperCase().charCodeAt(0) - 64; // C = // 67-64 = 3

  const cleanedModel = model.replace(/[^A-Za-z]/g, ''); // Civic!@*#&@*# = Civic
  const positionSum = [...cleanedModel].reduce(
    // [ I, C] = [ 9, 3].
    (sum, letter) => sum + getPositionOfAlphabet(letter),
    0 // 45
  );

  const carValue = positionSum * 100 + parsedYear;

  return { car_value: carValue };
};

const input = {
  model: 'Civic',
  year: '1991', // Change this to test different years
};

const output = calculateCarValue(input);
console.log(output);

module.exports = calculateCarValue;
