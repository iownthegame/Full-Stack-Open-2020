import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, ssn, gender, occupation, dateOfBirth } = req.body;
  const newPatientEntry = patientService.addPatient({
    dateOfBirth,
    gender,
    occupation,
    ssn,
    name
  });
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  res.json(newPatientEntry);
});

export default router;
