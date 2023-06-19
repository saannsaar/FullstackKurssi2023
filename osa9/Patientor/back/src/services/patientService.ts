import patientsData from '../../data/patients';

import { PatientEntry, NonSensitivePatientEntry } from '../../types';


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

const addPatient = () => {
    return null;
};

export default {
    getPatients,
    getNonSensitiveEntriers,
    addPatient
};
