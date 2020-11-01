import patientData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id) as Patient;
  return patient;
};

const getNonSensitiveEntries = () : NonSensitivePatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = ( entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: (patients.length + 1).toString(),
    entries: [],
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

