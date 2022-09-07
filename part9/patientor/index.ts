import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

import diagnosisRouter from './routes/diagnosisRouter';
import patientRouter from './routes/patientsRouter';

const PORT = 3001;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log("We've been pinged");
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
