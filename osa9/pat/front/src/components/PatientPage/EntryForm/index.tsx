import { Dispatch, useState } from "react";
import { EntryFormValues, Patient } from "../../../types";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import AddEntry from "../EntryForm/addentry";


interface Props {
    modalOpen: boolean;
    onClose: () => void;
    error?: string;
    patient: Patient;
    setError: React.Dispatch<React.SetStateAction<string | undefined>>;
    setPatient:  React.Dispatch<React.SetStateAction<Patient | undefined>>;
    setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const EntryForm = ({ modalOpen, onClose, error, setError, patient, setModalOpen, setPatient } : Props ) => {

    const [open, setOpen] = useState(false);

    const handleOpenForm = () => {
        setOpen(true)
        console.log("open form")
    }
    const handleClose = () => {
        setOpen(false)
    }



    return (
        <div>
            <Button variant="outlined" onClick={handleOpenForm}>
                Add new entry for {patient.name}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New entry</DialogTitle>
                <DialogContent>
                    <AddEntry setModalOpen={setModalOpen} setPatient={setPatient} onCancel={onClose} setError={setError} patient={patient}/>
                </DialogContent>
            </Dialog>
        </div>
    )
  };

  export default EntryForm;