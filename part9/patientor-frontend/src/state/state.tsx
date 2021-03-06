import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Entry, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patient: Patient | undefined;
  diagnoses: { [code: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  patient: undefined,
  diagnoses: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient
  };
};

export const setDiagnosList = (diagnosList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOS_LIST",
    payload: diagnosList
  };
};

export const addEntryToPatient = (id: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY_TO_PATIENT",
    payload: { id, entry }
  };
};
