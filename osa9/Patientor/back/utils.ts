/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NewPatientEntry, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const isGenger = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGenger(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    return gender;
};


const parseEntries = (entries: any): Entry[] => {
    if (!entries) {
        throw new Error('Incorrect or missing entries');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {

    if (!object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newPatient: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries)
         };
         return newPatient;
    }

    throw new Error('Incorrect data: a field missing');
   

   
};

export default toNewPatientEntry;