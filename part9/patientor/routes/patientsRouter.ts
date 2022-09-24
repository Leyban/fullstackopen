import express from 'express';
import patientServices from '../services/patientServices';
import toNewEntry, { EntryFields } from '../utils/toNewEntry';
import toNewPatient, { PatientFields } from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServices.getPatients());
});

router.get('/:id', (req, res) => {
  try {
    const returnedPatient = patientServices.getPatient(req.params.id);
    if (!returnedPatient) {
      throw new Error('No such patient found');
    }

    res.send(returnedPatient);
  } catch (error) {
    res.status(400);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body as PatientFields);
    const addedPatient = patientServices.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400);
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry = toNewEntry(req.body as EntryFields);
    const updatedPatient = patientServices.addEntry(patientId, newEntry);
    res.send(updatedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

export default router;
