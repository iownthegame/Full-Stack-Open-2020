interface ExerciseValues {
  exercises: Array<number>,
  target: number
}

interface ResExerciseValues {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exercises: Array<number>, target: number): ResExerciseValues => {
  const total = exercises.reduce((a, b) => a + b, 0);
  const avg = total / exercises.length;

  let rating = 1, ratingDescription = 'could be better';
  if (avg >= 2) {
    rating = 3;
    ratingDescription = 'good';
  } else if (avg >= 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  const res = {
    periodLength: exercises.length,
    trainingDays: exercises.filter(ex => ex > 0).length,
    success: avg >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avg
  };
  console.log(res);
  return res;
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

const parseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
  }

  return {
    exercises: args.slice(3).map(ex => Number(ex)),
    target: Number(args[2])
  };
};

try {
  const { exercises, target } = parseArguments(process.argv);
  calculateExercises(exercises, target);
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}
