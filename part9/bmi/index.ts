import express from 'express';
const app = express();

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

// import functions
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseAnalysis } from './exerciseCalculator';

// evaluator functions
const evalHeightAndWeight = (height: number, weight: number) => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('height and weight must be numbers');
  }
  if (!height || !weight) {
    throw new Error('Parameters missing');
  }
};
const evalExercises = (exerciseBody: { daily_exercises: Array<number>; target: number }) => {
  console.log(exerciseBody);
  if (!exerciseBody) throw new Error('parameters missing');
  if (!exerciseBody.daily_exercises || !exerciseBody.target) {
    throw new Error('parameters missing');
  }
  if (!Array.isArray(exerciseBody.daily_exercises)) {
    throw new Error('malformatted parameters');
  }
  if (exerciseBody.daily_exercises.some((ex) => isNaN(Number(ex)))) {
    throw new Error('malformatted parameters');
  }
  if (isNaN(Number(exerciseBody.target))) throw new Error('malformatted parameters');

  return exerciseBody;
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  let result: {
    height: number;
    weight: number;
    bmi: string;
  };
  try {
    evalHeightAndWeight(height, weight);
    result = {
      height,
      weight,
      bmi: calculateBmi(height, weight),
    };
    res.send(result);
  } catch (error) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.send({
      error: errorMessage,
    });
  }
});

app.post('/exercise', jsonParser, (req, res) => {
  console.log(req.body);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const exerciseBody = evalExercises(req.body);
    const analysis: ExerciseAnalysis = calculateExercises(exerciseBody.daily_exercises, exerciseBody.target);
    res.send(analysis);
  } catch (error) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.send({
      error: errorMessage,
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
