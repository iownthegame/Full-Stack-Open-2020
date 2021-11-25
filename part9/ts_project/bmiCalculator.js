"use strict";
exports.__esModule = true;
exports.calculateBmi = void 0;
function calculateBmi(height, weight) {
    var BMI = weight / ((height / 100) * (height / 100));
    var res;
    if (BMI < 15)
        res = "Very severely underweight";
    else if (BMI < 16)
        res = "Severely underweight";
    else if (BMI < 18.5)
        res = "Underweight";
    else if (BMI < 25)
        res = "Normal (healthy weight)";
    else if (BMI < 30)
        res = "Overweight";
    else if (BMI < 35)
        res = "Obese Class I (Moderately obese)";
    else if (BMI < 40)
        res = "Obese Class II (Severely obese)";
    else
        res = "Obese Class III (Very severely obese)";
    console.log(res);
    return res;
}
exports.calculateBmi = calculateBmi;
// console.log(calculateBmi(180, 74))
var height = Number(process.argv[2]);
var weight = Number(process.argv[3]);
calculateBmi(height, weight);
