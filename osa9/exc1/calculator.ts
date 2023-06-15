
type Operation = 'multiply' | 'add' | 'divide';
// type Result = string | number;
const calculator = (a: number, b: number, op: Operation) : number => {
    switch(op) {
      case 'multiply':
        return a * b;
      case 'divide':
        if (b === 0) throw new Error('Can\'t divide by 0!');
        return a / b;
      case 'add':
        return a + b;
      default:
        throw new Error('Operation is not multiply, add or divide!');
    }
  }
  
  try {
    console.log(calculator(1, 5 , 'divide'));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    // we can't use error.message here
    if (error instanceof Error) {
        // the type is narrowed and we can refer to error.message
      errorMessage += error.message;
    }
    // cant use error.message here
    console.log(errorMessage);
  }

  console.log(process.argv)

  calculator(1, 3, 'multiply')