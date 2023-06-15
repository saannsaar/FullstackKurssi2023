import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})


app.get('/bmi', (req, res) => {
    const weight = req.query.weight
    const height = req.query.height
    console.log(weight, height)
    if (!weight || !height || Number.isNaN(Number(weight)) || Number.isNaN(Number(height))) {
        return res.status(400).json({error: 'malformatted parameters'})
    }
    const bmiResult = calculateBmi(Number(weight), Number(height))
    return res.status(200).json({ weight, height, bmi: bmiResult })
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})