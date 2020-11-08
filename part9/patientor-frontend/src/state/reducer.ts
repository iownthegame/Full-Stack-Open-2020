import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY_TO_PATIENT";
    payload: { id: string; entry: Entry };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnos) => ({ ...memo, [diagnos.code]: diagnos }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY_TO_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: [
              ...state.patients[action.payload.id].entries,
              action.payload.entry
            ]
          }
        },
        patient: state.patient ?
          {
            ...state.patient,
            entries: [
              ...state.patient.entries,
              action.payload.entry
            ]
          } : undefined
      };
    default:
      return state;
  }
};
