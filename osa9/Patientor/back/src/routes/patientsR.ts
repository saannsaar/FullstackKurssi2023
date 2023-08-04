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

router.post('/:id/entries', (req, res) => {
    try
})

export default router;



We have established that patients can have different kinds of entries. We don't yet have any way of adding entries to patients in our app, so, at the moment, it is pretty useless as an electronic medical record.

Your next task is to add endpoint /api/patients/:id/entries to your backend, through which you can POST an entry for a patient.

Remember that we have different kinds of entries in our app, so our backend should support all those types and check that at least all required fields are given for each type.

In this exercise you quite likely need to remember this trick.

You may assume that the diagnostic codes are sent in a correct form and use eg. the following kind of parser to extract those from the request body:


const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };