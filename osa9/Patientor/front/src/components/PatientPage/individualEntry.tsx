
import { Table, TableHead, TableRow, TableCell} from "@mui/material";
import { Entry, Patient } from "../../types";




interface Props {
    entry : Entry;
  }
  
  const IndividualEntry = ({ entry } : Props ) => {
    console.log( entry)
   return (
    <TableRow key={entry.id}>

              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell>
               {entry.specialist}
              </TableCell>
              
               {entry.diagnosisCodes !== undefined ? <TableCell> 
                {entry.diagnosisCodes?.map((d, i) => (
                <li key={i}>{d}</li>
               ))}
               </TableCell> :
               <TableCell> No diagnosis codes </TableCell>
              }
            </TableRow>
   )
   
  };
  
  export default IndividualEntry;
  