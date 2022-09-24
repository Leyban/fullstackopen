import patients from '../data/patients';
import { Entry, EntryTypes, NewEntry, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const assertNever = (value: never): never => {
  throw new Error('Uncaught type' + value);
};

const getPatients = (): Omit<Patient, 'ssn' | 'entries'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patientEntry: NewPatient): Patient => {
  const newPatient = {
    id: String(uuid()),
    entries: [],
    ...patientEntry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Patient | undefined => {
  const createNewEntry = (): Entry => {
    switch (entry.type) {
      case EntryTypes.HealthCheck:
        return {
          ...entry,
          id: String(uuid()),
          type: EntryTypes.HealthCheck,
        };
      case EntryTypes.Hospital:
        return {
          ...entry,
          id: String(uuid()),
          type: EntryTypes.Hospital,
        };
      case EntryTypes.OccupationalHealthcare:
        return {
          ...entry,
          id: String(uuid()),
          type: EntryTypes.OccupationalHealthcare,
        };
      default:
        return assertNever(entry);
    }
  };

  const newEntry = createNewEntry();

  patients.map((p) => {
    if (p.id === patientId) {
      p.entries.push(newEntry);
    }
  });

  return patients.find((p) => p.id === patientId);
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};
