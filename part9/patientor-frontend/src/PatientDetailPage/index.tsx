import React from "react";
import axios from "axios";
import { useRouteMatch, useParams } from "react-router-dom";
import { Icon, Card, Button } from 'semantic-ui-react';

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntryToPatient } from "../state";
import { Patient, Entry, HealthCheckRating } from "../types";

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Card fluid
      header={<>{entry.date} <Icon name="hospital" /></>}
      meta={<p><i>{entry.description}</i></p>}
    />
  );
};

const OccupationalHealthcareEntry: React.FC<{ entry: Entry; employerName: string }> = ({ entry, employerName }) => {
  return (
    <Card fluid
      header={<>{entry.date} <Icon name="stethoscope" /> {employerName}</>}
      meta={<p><i>{entry.description}</i></p>}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getHealthCheckRatingColor = (rating: HealthCheckRating): any => {
  const map = ["green", "yellow", "orange", "red"];
  return map[rating];
};

const HealthCheckEntry: React.FC<{ entry: Entry; healthCheckRating:  HealthCheckRating }> = ({ entry, healthCheckRating }) => {
  return (
    <Card fluid
      header={<>{entry.date} <Icon name="doctor" /></>}
      meta={<p><i>{entry.description}</i></p>}
      description={<Icon name="heart" color={getHealthCheckRatingColor(healthCheckRating)} />}
    />
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union me mber: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} employerName={entry.employerName} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} healthCheckRating={entry.healthCheckRating} />;
    default:
      return assertNever(entry);
  }
};

const PatientDetailPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  // const [{ patient, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patient) return;

    const id = patient.id;
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntryToPatient(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
        dispatch(setPatient(patientFromApi));
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

      <h2>entries</h2>
      <Card.Group>
      {patient.entries.map(entry => {
        return (
          <EntryDetails key={entry.id} entry={entry} />
          // <p>{entry.date} <i>{entry.description}</i></p>
          // <ul>
          //   {entry.diagnosisCodes?.map(code =>
          //     <li key={code}>{code} {diagnoses && diagnoses[code] && diagnoses[code].name}</li>
          //   )}
          // </ul>
        );
      })}
      </Card.Group>
      <br />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </>
  );
};

export default PatientDetailPage;
