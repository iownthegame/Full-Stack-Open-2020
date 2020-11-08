import { NewPatientEntry, Gender, NewEntry, HealthCheckRating, NewHealthCheckEntry, NewOccupationalHealthcareEntry, NewHospitalEntry } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    name: parseString(object.name, 'name'),
    ssn: parseString(object.ssn, 'ssn'),
    occupation: parseString(object.occupation, 'occupation'),
    dateOfBirth: parseDate(object.dateOfBirth, 'date of birth'),
    gender: parseGender(object.gender),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntry => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  if (object.type == 'HealthCheck') {
    const newEntry: NewHealthCheckEntry = {
      description: parseString(object.description, 'description'),
      date: parseDate(object.date, 'date'),
      specialist: parseString(object.specialist, 'specialist'),
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
    return newEntry;
  }

  if (object.type == 'OccupationalHealthcare') {
    const newEntry: NewOccupationalHealthcareEntry = {
      description: parseString(object.description, 'description'),
      date: parseDate(object.date, 'date'),
      specialist: parseString(object.specialist, 'specialist'),
      type: 'OccupationalHealthcare',
      employerName: parseString(object.employerName, 'employerName'),
    };
    if (object.sickLeave.startDate || object.sickLeave.EndDate) {
      newEntry.sickLeave = {
        startDate: parseDate(object.sickLeave.startDate, 'start date'),
        endDate: parseDate(object.sickLeave.EndDate, 'end date')
      };
    }
    return newEntry;
  }

  const newEntry: NewHospitalEntry = {
    description: parseString(object.description, 'description'),
    date: parseDate(object.date, 'date'),
    specialist: parseString(object.specialist, 'specialist'),
    type: 'Hospital',
    discharge: {
      date: parseDate(object.discharge.date, 'discharge date'),
      criteria: parseString(object.discharge.criteria, 'criteria')
    }
  };

  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  return newEntry;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: any, field: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${field}: ${text as string}`);
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any, field: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing ${field}: ${date as string}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error(`Incorrect or missing visibility: ${gender as string}`);
  }
  return gender;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing visibility: ${healthCheckRating as string}`);
  }
  return healthCheckRating;
};

// const parseDiagnosisCodes = (diagnosisCodes: any): Array<string> => {
//   if(!diagnosisCodes)
//     return [];
//   return diagnosisCodes.map(code => parseString(code, 'diagnosisCodes'));
// };

export default toNewPatientEntry;
