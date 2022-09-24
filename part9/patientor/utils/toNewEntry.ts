import {
  Diagnosis,
  Discharge,
  Entry,
  EntryTypes,
  HealthCheckRating,
  NewEntry,
  SickLeave,
} from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// const isNumber = (n: unknown): n is number => {
//     return typeof n === 'number' || n instanceof String;
// };

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error('Missing or incorrect value' + str);
  }
  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const isStringArray = (strArray: unknown): strArray is string[] => {
  if (!Array.isArray(strArray)) {
    return false;
  }
  if (strArray.some((code) => !isString(code))) {
    return false;
  }

  return true;
};

const parseDiagnosisCodes = (codeArray: unknown): Array<Diagnosis['code']> => {
  if (!codeArray) {
    return [];
  }

  if (!isStringArray(codeArray)) {
    throw new Error('Invalid diagnosis codes: ' + codeArray);
  }

  return codeArray;
};

// explicit any for 'includes' method
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (entryType: any): entryType is Entry['type'] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryTypes).includes(entryType);
};
const parseEntryType = (entryType: unknown): Entry['type'] => {
  if (!entryType || !isString(entryType)) {
    throw new Error('Missing or Incorrect entry type: ' + entryType);
  }
  if (!isEntryType(entryType)) {
    throw new Error('Invalid Entry Type: ' + entryType);
  }

  return entryType;
};

// explicit any for 'includes' method
const isHealthCheckRating = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rating: any
): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating) {
    if (rating !== HealthCheckRating.Healthy) {
      throw new Error('Missing health check rating: ' + rating);
    }
  }
  if (!isHealthCheckRating(rating)) {
    throw new Error('Missing or invalid health check rating: ' + rating);
  }

  return rating;
};

const isObject = (value: unknown): value is object => {
  return typeof value === 'object';
};

interface DischargeField {
  date: unknown;
  criteria: unknown;
}

const isDischargeUnkown = (value: object): value is DischargeField => {
  if (
    !Object.prototype.hasOwnProperty.call(value, 'date') ||
    !Object.prototype.hasOwnProperty.call(value, 'criteria')
  ) {
    return false;
  }
  return true;
};
const isDischarge = (discharge: DischargeField): discharge is Discharge => {
  return (
    isString(discharge.date) && isDate(discharge.date) && isString(discharge.criteria)
  );
};

const parseDischarge = (discharge: unknown): Discharge | undefined => {
  if (!discharge) {
    return undefined;
  }
  if (!isObject(discharge) || !isDischargeUnkown(discharge) || !isDischarge(discharge)) {
    throw new Error('Missing or incorrect discharge type: ' + discharge);
  }
  return discharge;
};

interface SickLeaveField {
  startDate: unknown;
  endDate: unknown;
}

const isSickLeaveUnknown = (sickLeave: object): sickLeave is SickLeaveField => {
  if (
    !Object.prototype.hasOwnProperty.call(sickLeave, 'startDate') ||
    !Object.prototype.hasOwnProperty.call(sickLeave, 'endDate')
  ) {
    return false;
  }
  return true;
};
const isSickLeave = (sickLeave: SickLeaveField): sickLeave is SickLeave => {
  return (
    isString(sickLeave.startDate) &&
    isDate(sickLeave.startDate) &&
    isString(sickLeave.endDate) &&
    isDate(sickLeave.endDate)
  );
};
const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  if (!isObject(sickLeave) || !isSickLeaveUnknown(sickLeave) || !isSickLeave(sickLeave)) {
    throw new Error('Invalid Sickleave format: ' + sickLeave);
  }
  return sickLeave;
};

export interface EntryFields {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  type: unknown;
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  discharge?: unknown;
}

const assertNever = (value: never): never => {
  throw new Error('Uncaught type: ' + value);
};

const toNewEntry = ({
  description,
  date,
  specialist,
  type,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
}: EntryFields): NewEntry => {
  const baseEntry = {
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    type: parseEntryType(type),
  };

  switch (baseEntry.type) {
    case EntryTypes.HealthCheck:
      return {
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
        type: EntryTypes.HealthCheck,
      };
    case EntryTypes.Hospital:
      return {
        ...baseEntry,
        discharge: parseDischarge(discharge),
        type: EntryTypes.Hospital,
      };
    case EntryTypes.OccupationalHealthcare:
      return {
        ...baseEntry,
        employerName: parseString(employerName),
        sickLeave: parseSickLeave(sickLeave),
        type: EntryTypes.OccupationalHealthcare,
      };
    default:
      return assertNever(baseEntry.type);
  }
};

export default toNewEntry;
