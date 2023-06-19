import diagnosesData from '../../data/diagnoses';

import { DiagnoseEntry } from '../../types';


const diagnoses: DiagnoseEntry[] = diagnosesData ;

const getEntries = (): DiagnoseEntry[] => {
    return diagnoses;
};


const addDiagnose = () => {
    return null;
};

export default {
    getEntries,
    addDiagnose
};
