export interface ExerciseAnalysis {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (traningHours: Array<number>, targetHours: number): ExerciseAnalysis => {
  const average = traningHours.reduce((accumulatedHours, hours) => accumulatedHours + hours, 0) / traningHours.length;
  const trainingDays = traningHours.filter((hours) => hours > 0).length;
  const success = average >= targetHours;
  let rating, ratingDescription;

  if (success) {
    rating = 3;
    ratingDescription = 'well done, padawan';
  } else if (average < targetHours / 2) {
    rating = 1;
    ratingDescription = 'we can do better, tiger';
  } else {
    rating = 2;
    ratingDescription = 'bravo, avocado';
  }

  return {
    periodLength: traningHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

interface Arguments {
  target: number;
  hours: Array<number>;
}
const parseExercises = (args: Array<string>): Arguments => {
  if (!args.slice(2).every((arg) => !isNaN(Number(arg)))) throw new Error('Values should all be numbers');
  if (args.length < 4) throw new Error('Must input at least 2 values');

  const hours = args.map((arg) => Number(arg)).slice(3);
  return {
    target: Number(args[2]),
    hours,
  };
};

try {
  const { target, hours } = parseExercises(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error) {
  let errorMessage = 'something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
