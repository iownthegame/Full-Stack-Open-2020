import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.json({
      error: "malformatted parameters"
    });
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if (!daily_exercises || !target) {
    res.json({
      error: "parameters missing"
    });
  }

  res.json({...
    calculateExercises(daily_exercises, Number(target))
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
