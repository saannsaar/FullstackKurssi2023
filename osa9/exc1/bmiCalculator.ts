
  interface Values {
    weight: number;
    height: number;
  }
  
  const parsseArguments = (args: string[]): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        weight: Number(args[2]),
        height: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
  const calculateBmi = (height: number, weight: number): string => {
    const bmi = parseFloat(((1.3 * weight) / (height ** 2.5) * 100000).toFixed(2));
    if( bmi < 16.0 ) {
        return `Underweight (Severe thinness): ${bmi}`;
    }
    else if (bmi > 16.0 && bmi < 16.9 ) {
        return `Underweight (Moderate thinness): ${bmi}`;
    }
    else if ( bmi > 17.0 && bmi < 18.4) {
        return `Underweight (Mild thinness): ${bmi}`;
    }
    else if (bmi > 18.5 && bmi < 24.9) {
        return `Normal range: ${bmi}`;
    }
    else if (bmi > 25.0 && bmi < 29.9) {
        return `Overweight (Pre-obese): ${bmi}`;
    }
    else if ( bmi > 30.0 && bmi < 34.9) {
        return `Obese (Class I): ${bmi}`;
    }
    else if (bmi > 35.0 && bmi < 39.9) {
        return  `Obese (Class II): ${bmi}`;
    }
    else {
        return `Obese (Class III): ${bmi}`;
    }
   

  };

  try {
    const { weight, height } = parsseArguments(process.argv);
    console.log(calculateBmi(weight, height));
    calculateBmi(weight, height);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

  export { calculateBmi };