import { Gender } from '../types';
import { NewPatient } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Invalid or missing name: ' + name);
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Invalid or missing ssn: ' + ssn);
  }

  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

type PatientFields = {
  name: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatient = ({ name, ssn, dateOfBirth, gender, occupation }: PatientFields): NewPatient => {
  const newPatient = {
    name: parseName(name),
    ssn: parseSsn(ssn),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };

  return newPatient;
};

export default toNewPatient;
