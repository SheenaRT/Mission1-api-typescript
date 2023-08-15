"use strict";
const letterToNumber = (letter) => {
    letter = letter.toUpperCase();
    return letter.charCodeAt(0) - 64;
};
