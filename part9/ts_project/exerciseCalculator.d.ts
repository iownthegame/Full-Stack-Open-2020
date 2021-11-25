interface ResExerciseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
export declare function calculateExercises(exercises: Array<number>, target: number): ResExerciseValues;
export {};
