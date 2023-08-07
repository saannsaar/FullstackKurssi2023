import { useEffect, useState } from "react";
import { EntryFormValues, Patient } from "../../types";
import { useParams } from "react-router-dom";
import { Box, Icon, Typography } from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import axios from "axios";

import patientService from "../../services/patients";
import Entries from "./entries";
import EntryForm from "./EntryForm";

interface Props {
    patients : Patient[]
  }
  
  const PatientPage = ({ patients } : Props ) => {
    const {id} = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | undefined>();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };
   
   useEffect(() => {
    const getCorrectPatient = async () => {
        if (id) {
            await patientService.getPatient(id).then((response) => {
                setPatient(response)
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }
    void getCorrectPatient();
   }, [id])

   const submitNewEntry = async (values: EntryFormValues) => {
    try {
        if (patient && patient !== undefined) {
            const entry = await patientService.createEntry(patient, values);
            const newPatient = {
                ...patient,
                entries: [...patient.entries, entry]
            }
            setPatient(newPatient);
            setModalOpen(false);
        }
      
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

   console.log(patient)
    console.log(Object.values(patients));


    
    // const patient = Object.values(patients).find(patient => patient.id === id.id)

    console.log(patient)
  
    if (patient) {
        
        return (
            <><div className="App">
                <Box>
                    <Typography align="left" variant="h5">
                        {patient.name}
                        {patient.gender === 'female' ? <FemaleIcon></FemaleIcon> :
                            patient.gender === 'male' ? <MaleIcon></MaleIcon> :
                                <PanoramaFishEyeIcon></PanoramaFishEyeIcon>}
                    </Typography>

                </Box>

                <Box>
                    <Typography variant="h6">
                        Ssh: {patient.ssn}
                    </Typography>
                    <Typography variant="h6">
                        Occupation: {patient.occupation}
                    </Typography>
                </Box>


            </div>
            <div>
                <EntryForm patient={patient} modalOpen={modalOpen} onClose={closeModal}  error={error} setError={setError} setModalOpen={setModalOpen} setPatient={setPatient}/>
            </div>
            <div>
                    <Entries patient={patient} entries={patient.entries} />
                </div></>
            
          );
    }
    return null;
   
  };
  
  export default PatientPage;
  