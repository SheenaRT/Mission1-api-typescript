"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
function letterToNumber(letter) {
    letter = letter.toUpperCase();
    return letter.charCodeAt(0) - 64;
}
function getCarValue(model, year) {
    let result = 0;
    for (const letter of model) {
        result += letterToNumber(letter);
    }
    result = result * 100 + year;
    return { car_value: result };
}
function calculateRiskRating(claim_history) {
    const keywords = ["collide", "crash", "scratch", "bump", "smash"];
    let result = 0;
    const words = claim_history.split(" ");
    for (const word of words) {
        for (const keyword of keywords) {
            if (word.includes(keyword)) {
                result++;
                break;
            }
        }
    }
    return { risk_rating: result };
}
function calculatePremium(car_value, risk_rating) {
    let result = car_value * risk_rating / 100;
    return { monthly_premium: Math.round(result / 12 * 100) / 100, yearly_premium: Math.round(result * 100) / 100 };
}
app.use(express_1.default.json());
// API 1
app.post('/suggested-car', (_req, _res) => {
    var _a, _b;
    if (((_a = _req === null || _req === void 0 ? void 0 : _req.body) === null || _a === void 0 ? void 0 : _a.model) == null || ((_b = _req === null || _req === void 0 ? void 0 : _req.body) === null || _b === void 0 ? void 0 : _b.year) == null) {
        _res.status(400).send({ error: "there is an error" });
    }
    const { model, year } = _req.body;
    _res.send(getCarValue(model, year));
});
// API 2
app.post('/risk-rating', (_req, _res) => {
    var _a;
    if (((_a = _req === null || _req === void 0 ? void 0 : _req.body) === null || _a === void 0 ? void 0 : _a.claim_history) == null) {
        _res.status(400).send({ error: "there is an error" });
    }
    const { claim_history } = _req.body;
    _res.send(calculateRiskRating(claim_history));
});
// API 3
app.post('/quote', (_req, _res) => {
    var _a, _b;
    if (((_a = _req === null || _req === void 0 ? void 0 : _req.body) === null || _a === void 0 ? void 0 : _a.car_value) == null || ((_b = _req === null || _req === void 0 ? void 0 : _req.body) === null || _b === void 0 ? void 0 : _b.risk_rating) == null) {
        _res.status(400).send({ error: "there is an error" });
    }
    const { car_value, risk_rating } = _req.body;
    _res.send(calculatePremium(car_value, risk_rating));
});
app.listen(port, () => {
    console.log("Server listening on Port", port);
});
