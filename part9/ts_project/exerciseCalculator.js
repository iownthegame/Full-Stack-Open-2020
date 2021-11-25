"use strict";
exports.__esModule = true;
exports.calculateExercises = void 0;
function calculateExercises(exercises, target) {
    var total = exercises.reduce(function (a, b) { return a + b; }, 0);
    var avg = total / exercises.length;
    var rating = 1, ratingDescription = 'could be better';
    if (avg >= 2) {
        rating = 3;
        ratingDescription = 'good';
    }
    else if (avg >= 1) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    var res = {
        periodLength: exercises.length,
        trainingDays: exercises.filter(function (ex) { return ex > 0; }).length,
        success: avg >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: avg
    };
    console.log(res);
    return res;
}
exports.calculateExercises = calculateExercises;
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
var parseArguments = function (args) {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    for (var i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        }
    }
    return {
        exercises: args.slice(3).map(function (ex) { return Number(ex); }),
        target: Number(args[2])
    };
};
try {
    var _a = parseArguments(process.argv), exercises = _a.exercises, target = _a.target;
    calculateExercises(exercises, target);
}
catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
}
