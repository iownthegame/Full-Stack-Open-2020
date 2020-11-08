import React from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosList } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientDetailPage from "./PatientDetailPage";
import PatientListPage from "./PatientListPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();

    const fetchDiagnosList = async () => {
      try {
        const { data: diagnosListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosList(diagnosListFromApi));
      } catch (e) {
        console.error(e);
    }
    };
    fetchDiagnosList();
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>
          Home
        </Button>
        <Divider hidden />
        <Switch>
          <Route path="/patients/:id" render={() => <PatientDetailPage />} />
          <Route path="/" render={() => <PatientListPage />} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
