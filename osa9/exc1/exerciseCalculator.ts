interface Feedback {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }

  interface TrainingValues {
    exerciseHoursArray: Array<number>;
    targetHours: number;
  }
  
  const parseArguments = (args: Array<string>): TrainingValues => {
   console.log("HEI");
   console.log(args[2]);
   const exerciseHoursArray = [];
   for (let i = 3; i < args.length; i++ ) {
    if (Number.isNaN(Number(args[i]))) {
        throw new Error('You have to give numbers!');
    }
    exerciseHoursArray.push(Number(args[i]));
   }
    return {
        exerciseHoursArray,
        targetHours: Number(args[2])
    };
   
  };
  
  export const calculateExercise = (exerciseHoursArray: Array<number>, targetHours: number): Feedback => {

  
   const periodLength = exerciseHoursArray.length;
   const trainingDays = exerciseHoursArray.filter(day => day > 0).length;
   let sum = 0;
   for (let i = 0; i < exerciseHoursArray.length; i++) {
    sum += exerciseHoursArray[i];
   }

   console.log("SUM: ", sum);
   const totalHours = sum;
   const average = (totalHours / periodLength);
   const success = (average >= targetHours);
   let rating;
   let ratingDescription;
   if (success) {
    rating = 3;
    ratingDescription = 'Awesome! You succeeded on your goals!';
   }
   else if ( average >= targetHours * 0.6) {
    rating = 2;
    ratingDescription = 'Great, next time push it a bit more!';
   }
   else {
    rating = 1;
    ratingDescription = 'Maybe you could try a bit more next time?';
   }

   
   return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average
   };


   
  };
  
  try {
    console.log("MOI");
    const { exerciseHoursArray, targetHours } = parseArguments(process.argv);
   console.log( calculateExercise(exerciseHoursArray, targetHours));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  } 