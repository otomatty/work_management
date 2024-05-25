<<<<<<< HEAD:src/components/molecules/CreateProblemButton.tsx
import React from "react";
import { generateProblems } from "../../utils/problemGenerator";
import Button from "../atoms/Button/Button";
=======
import React from 'react';
import { generateProblems } from '../../utils/problemGenerator';
import Button from '../atoms/Button';
>>>>>>> develop:src/components/molecules/CreateProblemButton.jsx

// プロパティの型を定義
interface CreateProblemButtonProps {
  selectedTypes: string[];
  selectedFormats: string[];
  terms: string;
  problemCount: string;
  includeNegatives: boolean;
  onCreateProblems: (problems?: any[]) => void; // 問題の型が不明なので、anyを使用
}

const CreateProblemButton: React.FC<CreateProblemButtonProps> = ({
  selectedTypes,
  selectedFormats,
  terms,
  problemCount,
  includeNegatives,
  onCreateProblems,
}) => {
  const handleCreateProblem = () => {
    if (selectedTypes.length === 0 || selectedFormats.length === 0) {
      onCreateProblems();
      return;
    }
    const problems = generateProblems(
      selectedTypes,
      selectedFormats,
      parseInt(terms, 10),
      parseInt(problemCount, 10),
      includeNegatives
    );
    onCreateProblems(problems);
  };

  return <Button onClick={handleCreateProblem} label="問題作成" />;
};

export default CreateProblemButton;
