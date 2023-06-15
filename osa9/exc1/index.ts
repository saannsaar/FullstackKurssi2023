import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator, Operation } from './calculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.post('calculate', (req, res) => {
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {value1, value2, op } = req.body;

   
   

    if ( !value1 || isNaN(Number(value1)) ) {
        return res.status(400).send({ error: '...'});
      }

     
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculator(Number(value1), Number(value2), op as Operation);
    return res.send({ result });
});


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
    const weight = req.query.weight;
    const height = req.query.height;
    console.log(weight, height);
    if (!weight || !height || Number.isNaN(Number(weight)) || Number.isNaN(Number(height))) {
        return res.status(400).json({error: 'malformatted parameters'});
    }
    const bmiResult = calculateBmi(Number(weight), Number(height));
    return res.status(200).json({ weight, height, bmi: bmiResult });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target } = req.body;

    if (!daily_exercises || !target ) {
        return res.status(400).json({ error: 'missing parameters'});
    }

    if (  Number.isNaN(Number(target)) ||  Array.isArray(daily_exercises) && daily_exercises.find((e) => Number.isNaN(Number(e)))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercise(daily_exercises, target);
    return res.json(result);
});
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});