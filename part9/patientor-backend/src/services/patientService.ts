import patientData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry, Entry, NewEntry } from '../types';

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

const addEntryToPatient = (id: string, entry: NewEntry): Entry | undefined => {
  const patient = patients.find(patient => patient.id === id);
  if(!patient) {
    return undefined;
  }
  const newEntry = {
    id: (patient.entries.length + 1).toString(),
    ...entry
  } as Entry;
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  addEntryToPatient
};

