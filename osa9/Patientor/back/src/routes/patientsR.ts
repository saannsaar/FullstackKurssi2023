import express from 'express';
import patientService from '../services/patientService';


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntriers());
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnose!');
});

export default router;

