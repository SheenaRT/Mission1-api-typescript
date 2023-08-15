import express from 'express';



const app = express();
const port = process.env.PORT || 3000;

function letterToNumber(letter: string) {
    letter = letter.toUpperCase();
    return letter.charCodeAt(0) - 64;
}

function getCarValue(model: string, year: number) {
    let result = 0;
    for (const letter of model) {
        result += letterToNumber(letter);
    }
    result = result * 100 + year;
    return { car_value: result };
}

function calculateRiskRating(claim_history: string) {
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

function calculatePremium(car_value: number, risk_rating: number) {
    let result = car_value * risk_rating / 100;
    return { monthly_premium: Math.round(result / 12 * 100) / 100, yearly_premium: Math.round(result * 100) / 100 };
}

app.use(express.json());

// API 1
app.post('/suggested-car', (_req, _res) => {
    if (_req?.body?.model == null || _req?.body?.year == null) {
        _res.status(400).send({ error: "there is an error"});
    }
    const { model, year } = _req.body;
    _res.send(getCarValue(model, year));
});

// API 2
app.post('/risk-rating', (_req, _res) => {
    if (_req?.body?.claim_history == null) {
        _res.status(400).send({ error: "there is an error"});
    }
    const { claim_history } = _req.body;
    _res.send(calculateRiskRating(claim_history));
});

// API 3
app.post('/quote', (_req, _res) => {
    if (_req?.body?.car_value == null || _req?.body?.risk_rating == null) {
        _res.status(400).send({ error: "there is an error"});
    }
    const { car_value, risk_rating } = _req.body;
    _res.send(calculatePremium(car_value, risk_rating));
});

app.listen(port, () => {
    console.log("Server listening on Port", port);
});


export default app;

