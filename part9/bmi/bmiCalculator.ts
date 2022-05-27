const calculateBmi = (height: number, weight: number) => {
  const bmi = (weight * 10000) / (height * height);

  switch (true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)';
    case bmi < 17:
      return 'Underweight (Moderate thinness)';
    case bmi < 18.5:
      return 'Underweight (Mild thinness)';
    case bmi < 25:
      return 'Normal (Healthy weight)';
    case bmi < 30:
      return 'Overweight (Pre-obese)';
    case bmi < 35:
      return 'Obese (Class I)';
    case bmi < 40:
      return 'Obese (Class II)';
    case bmi >= 40:
      return 'Obese (Class III)';
    default:
      break;
  }
};

const parseArguments = (args: Array<string>): { height: number; weight: number } => {
  if (args.length > 4) throw new Error('too many arguments');
  if (args.length < 4) throw new Error('too few arguments');
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('height or weight is not a number');
  }
  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
