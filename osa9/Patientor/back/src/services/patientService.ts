/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../../types';


const patients: PatientEntry[] = patientsData;

const getPatients = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntriers = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name,
        dateOfBirth, 
        gender,
        occupation,
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const idd = uuid();
    const newPatientEntry = {
        id: idd,
        ...entry
        
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getNonSensitiveEntriers,
    addPatient
};
