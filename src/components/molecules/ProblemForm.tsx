import React, { useState } from "react";

interface ProblemFormProps {
  onAddProblem: (problem: string) => void;
}

const ProblemForm: React.FC<ProblemFormProps> = ({ onAddProblem }) => {
  const [problem, setProblem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProblem(problem);
    setProblem("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        placeholder="問題を入力"
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default ProblemForm;
