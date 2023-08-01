import { useEffect, useState } from "react";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import { Box, Icon, Typography } from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import axios from "axios";

import patientService from "../../services/patients";

interface Props {
    patients : Patient[]
  }
  
  const PatientPage = ({ patients } : Props ) => {
    const {id} = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | undefined>();

  
   
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


   console.log(patient)
    console.log(Object.values(patients));


    
    // const patient = Object.values(patients).find(patient => patient.id === id.id)

    console.log(patient)
  
    if (patient) {
        
        return (
            <div className="App">
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
          );
    }
    return null;
   
  };
  
  export default PatientPage;
  