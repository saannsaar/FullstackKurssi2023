
  const calculateBmi = (height: number, weight: number): string => {
    const bmi = parseFloat(((1.3 * weight) / (height ** 2.5) * 100000).toFixed(2))
    if( bmi < 16.0 ) {
        return 'Underweight (Severe thinness)'
    }
    if (bmi > 16.0 && bmi < 16.9 ) {
        return 'Underweight (Moderate thinness)'
    }
    if ( bmi > 17.0 && bmi < 18.4) {
        return 'Underweight (Mild thinness)'
    }
    if (bmi > 18.5 && bmi < 24.9) {
        return 'Normal range'
    }
    if (bmi > 25.0 && bmi < 29.9) {
        return 'Overweight (Pre-obese)'
    }
    if ( bmi > 30.0 && bmi < 34.9) {
        return 'Obese (Class I)'
    }

  }
 

  console.log(calculateBmi(180, 74))