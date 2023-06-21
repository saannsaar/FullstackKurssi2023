import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../../utils';


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntriers());
});

router.get('/:id', (req,res) => {
    const {id} = req.params;
    try {
        const findPatient = patientService.getOnePatient(id);
        res.send(findPatient);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({message: error.message});
        }

    }
});

router.post('/', (req, res) => {
   try {
    const newPatientEntry = toNewPatientEntry(req.body);
    console.log(newPatientEntry);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
   } catch (error: unknown) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
        errorMessage += ' Error; ' + error.message;
    }
    res.status(400).send(errorMessage);
   }
});

export default router;

