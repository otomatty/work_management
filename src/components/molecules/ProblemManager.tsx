import React, { useState } from "react";
import ProblemForm from "./ProblemForm";

const ProblemManager: React.FC = () => {
  const [problems, setProblems] = useState<string[]>([]);

  const addProblem = (problem: string) => {
    setProblems([...problems, problem]);
  };

  return (
    <div>
      <ProblemForm onAddProblem={addProblem} />
      <ul>
        {problems.map((problem, index) => (
          <li key={index}>{problem}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemManager;
