interface ExerciseValues {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exercises: Array<number>, target: number): ExerciseValues => {
  const total = exercises.reduce((a, b) => a + b, 0)
  const avg = total / exercises.length

  let rating = 1, ratingDescription = 'could be better'
  if (avg >= 2) {
    rating = 3
    ratingDescription = 'good'
  } else if (avg >= 1) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  }

  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter(ex => ex > 0).length,
    success: avg >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avg
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
