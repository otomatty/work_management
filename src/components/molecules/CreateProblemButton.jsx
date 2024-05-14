import React from "react";
import { generateProblems } from "../../utils/problemGenerator";
import Button from "../atoms/Button";

const CreateProblemButton = ({
  selectedTypes,
  selectedFormats,
  terms,
  problemCount,
  includeNegatives,
  onCreateProblems, // コールバック関数をプロパティとして受け取る
}) => {
  // console.log(selectedTypes); // 受け取った selectedTypes を確認
  const handleCreateProblem = () => {
    // 問題の種類や形式が適切に選択されているかチェック
    if (selectedTypes.length === 0 || selectedFormats.length === 0) {
      onCreateProblems(); // 問題が選択されていないことを示すためにコールバックを呼び出す
      return; // ここで処理を終了
    }
    // 問題生成ロジック
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
