import express from 'express';
import patientServices from '../services/patientServices';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServices.getPatients());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientServices.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400);
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

export default router;
