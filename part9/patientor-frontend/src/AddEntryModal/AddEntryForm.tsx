import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection, SelectField } from "../AddPatientModal/FormField";
import { HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id"> | Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
  { value: "Hospital", label: "Hospital" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: any } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "HealthCheck") {
          if (isNaN(values.healthCheckRating)) {
            errors.healthCheckRating = requiredError;
          }
        }
        else if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values?.sickLeave?.startDate || values?.sickLeave?.endDate) {
            if (!values.sickLeave.startDate) {
              errors.sickLeave = {
                startDate: requiredError
              };
            }
            if (!values.sickLeave.endDate) {
              errors.sickLeave = {
                ...errors.sickLeave,
                endDate: requiredError
              };
            }
          }
        }
        else if (values.type === "Hospital") {
          if (!values?.discharge?.date) {
            errors.discharge = {
              date: requiredError
            };
          }
          if (!values?.discharge?.criteria) {
            errors.discharge = {
              ...errors.discharge,
              criteria: requiredError
            };
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            {values.type === "HealthCheck" &&
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            }
            {values.type === "Hospital" &&
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                  />
                <Field
                  label="Discharge Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            }
            {values.type === "OccupationalHealthcare" &&
              <>
                <Field
                  label="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                  />
                <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            }
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
