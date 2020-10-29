import React from "react";
import axios from "axios";
import { useRouteMatch, useParams } from "react-router-dom";
import { Icon } from 'semantic-ui-react';

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientDetailPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

  const match = useRouteMatch('/patients/:id');
  const { id } = useParams<{ id: string }>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getGenderIconName = (gender: string): any => {
    if (gender === "male") return "mars";
    if (gender === "female") return "venus";
    return "genderless";
  };

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };

    if (match && id && id !== patient?.id) {
      fetchPatient(id);
    }
  }, [dispatch, match, id, patient]);

  if (patient === undefined) {
    return null;
  }

  return (
    <>
      <h1>{patient.name} <Icon name={getGenderIconName(patient.gender)} /></h1>
      <p>{`ssn: ${patient.ssn}`}</p>
      <p>{`occupation: ${patient.occupation}`}</p>
    </>
  );
};

export default PatientDetailPage;
