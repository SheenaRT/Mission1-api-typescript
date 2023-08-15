// type npm test to start jest

const calculateCarValue = require('../Carvaluetest/carvalue');
const assert = require('assert');

describe('calculateCarValue', () => {
  //test case 1 scenario
  it('Sunny day Scenario', () => {
    const input1 = { model: 'Civic', year: '2020' };
    const result1 = 6660;
    const totalresult1 = calculateCarValue(input1);
    assert.strict(result1, totalresult1);
  });

  //Test case 2 scenario
  it('Numbers only is ok', () => {
    const input2 = { model: '911', year: '2020' };
    const result2 = 2020;
    const totalresult2 = calculateCarValue(input2);
    assert.strict(result2, totalresult2);
  });

  //Test case 3 scenario

  it('Negative Year', () => {
    const input3 = { model: 'Task-Force', year: '-987' };
    const result3 = 'Error Message as the year is negative';
    const totalresult3 = calculateCarValue(input3);
    assert.strict(result3, totalresult3);
  });

  //Test case 4 scenario
  it('Wrong data type', () => {
    const input4 = { model: 'C200', year: 'twentytwenty' };
    const result4 = 'Error Message as the year must be in numbers';
    const totalresult4 = calculateCarValue(input4);
    assert.strict(result4, totalresult4);
  });

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
