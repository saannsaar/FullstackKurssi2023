
import { Table, TableHead, TableRow, TableCell} from "@mui/material";
import { Entry, Patient, DiagnoseEntry } from "../../types";
import { useEffect, useState } from "react";
import diagnoseService from "../../services/diagnosis"





interface Props {
    entry : Entry;
  }
  
  const IndividualEntry = ({ entry } : Props ) => {
    console.log( entry)
    const [diagnosis, setDiagnosis] = useState<DiagnoseEntry[] | undefined>();
    
    

   useEffect(() => {
    const getDiagnoses = async () => {
   
            await diagnoseService.getAll().then((response) => {
                setDiagnosis(response)
            }).catch((error) => {
                console.log(error.message);
            })
        
    }
    void getDiagnoses();
   }, [diagnosis])

   const diagnoseName = ( code: string ) => {
    if (diagnosis) {
        const findName = Object.values(diagnosis).find((diagnose: DiagnoseEntry) => diagnose.code === code);
        if (findName) {
            return findName.name;
        }
        return null;
    }
    
   }
      
   return (
    <TableRow key={entry.id}>

              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell>
               {entry.specialist}
              </TableCell>
              
               {entry.diagnosisCodes !== undefined ?
                <TableCell> 
                    {entry.diagnosisCodes?.map((d, i)  => (
                <li key={i}>{d} {diagnoseName(d)}</li>
               ))}</TableCell> :
               <TableCell> No diagnosis codes </TableCell>
              }
            </TableRow>
   )
   
  };
  
  export default IndividualEntry;
  