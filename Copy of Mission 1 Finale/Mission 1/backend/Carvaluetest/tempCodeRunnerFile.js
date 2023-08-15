const calculateCarValue = require('./calculateCarValue'); // Update the path accordingly

describe('calculateCarValue', () => {
  test('Valid input returns calculated car value', () => {
    const input = {
      model: 'Civic',
      year: '1991',
    };

    const output = calculateCarValue(input);

    expect(output).toHaveProperty('car_value');
    expect(output.car_value).toBeGreaterThan(0);
  });

  test('Invalid input returns error message', () => {
    const input = {
      model: 'InvalidModel',
      year: 'InvalidYear',
    };

    const output = calculateCarValue(input);

    expect(output).toHaveProperty('error');
    expect(output.error).toBe(
      'Invalid input. Please provide valid model and year.'
    );
  });

  test('Invalid year returns error message', () => {
    const input = {
      model: 'Civic',
      year: '99999', // An invalid year
    };

    const output = calculateCarValue(input);

    expect(output).toHaveProperty('error');
    expect(output.error).toBe(
      'Invalid year. Year must be a non-negative number up to 2023.'
    );
  });
});
