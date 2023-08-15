//reference https://www.typescriptlang.org/docs/handbook/2/objects.html
//API 3
function calculatingyearlypremium(a:number, b:number, ){
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        throw new Error("There is an error please check inputs");
    }
    const result= (a * b) / 100;
    return result
}
const multipliedresult = calculatingyearlypremium (6614, 5)// you can manually change this on your desired value 6614 car_value and risk rating 5 
console.log(`yearly_premium:`,multipliedresult.toFixed(2)) // yearly premium

function calculatingmonthlypremium (c:number){
    if (isNaN(c) || c <= 0 || c <= 0) {
        throw new Error("There is an error please check input")
    }
const result = multipliedresult / 12
return result 
}
const dividedresult = calculatingmonthlypremium(multipliedresult)
console.log(`monthly_premium`,dividedresult.toFixed(1));
