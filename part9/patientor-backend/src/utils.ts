import { NewPatientEntry, Gender } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    name: parseString(object.name, 'name'),
    ssn: parseString(object.ssn, 'ssn'),
    occupation: parseString(object.occupation, 'occupation'),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
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

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing dateOfBirth: ${date as string}`);
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

export default toNewPatientEntry;
