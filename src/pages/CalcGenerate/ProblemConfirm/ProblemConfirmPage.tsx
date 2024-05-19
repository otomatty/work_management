import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProblemList from "./ProblemList";
import { generateProblems } from "../../../utils/problemGenerator";
import Button from "../../../components/atoms/Button/Button";
import styled from "styled-components";

// スタイルドコンポーネントでメディアクエリを定義
const StyledScreen = styled.div`
  @media print {
    .no-print {
      display: none;
    }
    body * {
      visibility: hidden;
    }
    .printable,
    .printable * {
      visibility: visible;
    }
    .printable {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
`;

const ProblemConfirmPage = () => {
  const [problems, setProblems] = useState<string[]>([]); // 明示的に型を指定
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      selectedTypes,
      selectedFormats,
      terms,
      problemCount,
      includeNegatives,
      pageCount, // ページ数を受け取る
    } = location.state;

    const newProblems = generateProblems(
      selectedTypes,
      selectedFormats,
      parseInt(terms),
      parseInt(problemCount),
      includeNegatives,
      parseInt(pageCount) // ページ数を引数として渡す
    );
    setProblems(newProblems);
  }, [location.state]);

  useEffect(() => {
    console.log("Location State in ProblemConfirmScreen:", location.state);
  }, [location.state]);

  // ここで問題数に基づくロジックを適用する
  const adjustedProblemsPerPage =
    parseInt(location.state.problemCount) === 20
      ? 10
      : parseInt(location.state.problemCount);

  const handleBack = () => {
    navigate("/select", { state: location.state });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <StyledScreen>
      <h2 className="no-print">問題確認</h2>
      <ProblemList
        problems={problems}
        problemsPerPage={adjustedProblemsPerPage}
      />
      <Button label="戻る" onClick={handleBack} />

      <Button label="印刷" onClick={handlePrint} />
    </StyledScreen>
  );
};

export default ProblemConfirmPage;
