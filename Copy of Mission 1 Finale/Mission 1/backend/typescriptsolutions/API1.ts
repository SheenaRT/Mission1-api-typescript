
type Car = {
    model: string,
    year: number
}

function convertStringToValue(input: string, year: number): number | string {
    const letterValues: { [key: string]: number } = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
        j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18,
        s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
    };

    if (input === "" || year === 0) {
        return "There is an Error please check your input is not 0";
    }

    const lowercaseInput = input.toLowerCase();
    let sum = 0;

    for (const letter of lowercaseInput) {
        if (letterValues.hasOwnProperty(letter)) {
            sum += letterValues[letter];
        } 
    }

    if (isNaN(year) || year <= 0) {
        return "Invalid year";
    }

    const value = (sum * 100) + year;

    return value;
}


const inputmodel = "Civic";
const customYear = 2014; // Change this to any desired year
const result = convertStringToValue(inputmodel, customYear);

if (typeof result === 'number') {
    console.log(`car_value:`, result); // This will output the calculated value
} else {
    console.log(result); // This will output the error message
}
