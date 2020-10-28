import { countReset } from "console";
import React from "react";
import ReactDOM from "react-dom";

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "My Course";
  classroom: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "My Course",
    exerciseCount: 100,
    description: "My Course Description",
    classroom: "B01"
  }
];

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{name}</h1>;
};

const Total: React.FC<{ count: number }> = ({ count }) => {
  return (
    <p>
      Number of exercises{" "}
      {count}
    </p>
  );
};

const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
  switch (course.name) {
    case "Fundamentals":
      return <p>{course.name} {course.exerciseCount} {course.description}</p>;
    case "Using props to pass data":
      return <p>{course.name} {course.exerciseCount} {course.groupProjectCount}</p>;
    case "Deeper type usage":
      return <p>{course.name} {course.exerciseCount} {course.description} {course.exerciseSubmissionLink}</p>;
    case "My Course":
      return <p>{course.name} {course.exerciseCount} {course.description} {course.classroom}</p>
    default:
      return assertNever(course);
  }
};

const Content: React.FC<{ courses: Array<CoursePart> }> = ({ courses }) => {
  return (
    <>
      {courses.map(course => <Part key={course.name} course={course} />)}
    </>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total count={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
