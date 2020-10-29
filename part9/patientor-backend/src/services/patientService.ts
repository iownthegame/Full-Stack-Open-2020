import patientData from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';

const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id) as Patient;
  return {
    ...patient,
    entries: []
  };
};

const getNonSensitiveEntries = () : NonSensitivePatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: (patients.length + 1).toString(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient
};

