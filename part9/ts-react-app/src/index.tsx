import React from "react";
import ReactDOM from "react-dom";

interface Course {
  name: string,
  exerciseCount: number
}

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

const Content: React.FC<{ courses: Array<Course> }> = ({ courses }) => {
  return (
    <>
      <p>
        {courses[0].name} {courses[0].exerciseCount}
      </p>
      <p>
        {courses[1].name} {courses[1].exerciseCount}
      </p>
      <p>
        {courses[2].name} {courses[2].exerciseCount}
      </p>
    </>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total count={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
