"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var bmiCalculator_1 = require("./bmiCalculator");
var exerciseCalculator_1 = require("./exerciseCalculator");
var app = express_1["default"]();
app.use(express_1["default"].json());
app.get('/hello', function (_req, res) {
    res.send('Hello Full Stack!');
});
app.get('/bmi', function (req, res) {
    var _a = req.query, height = _a.height, weight = _a.weight;
    if (!height || !weight) {
        res.json({
            error: "malformatted parameters"
        });
    }
    res.json({
        weight: weight,
        height: height,
        bmi: bmiCalculator_1.calculateBmi(Number(height), Number(weight))
    });
});
app.post('/exercises', function (req, res) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var _a = req.body, target = _a.target, daily_exercises = _a.daily_exercises;
    if (!daily_exercises || !target) {
        res.json({
            error: "parameters missing"
        });
    }
    res.json(__assign({}, exerciseCalculator_1.calculateExercises(daily_exercises, Number(target))));
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
