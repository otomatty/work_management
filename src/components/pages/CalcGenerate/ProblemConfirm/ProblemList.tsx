import React from "react";
import styled from "styled-components";
import { InlineMath } from "react-katex";

const ProblemsContainer = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  list-style: none;

  @media print {
    gap: 10px;
  }
`;

const Problem = styled.li`
  padding: 10px;
  page-break-inside: avoid; // 問題がページを跨がないようにする
`;

const ProblemList = ({
  problems,
  problemsPerPage,
}: {
  problems: string[];
  problemsPerPage: number;
}) => {
  // 分数をKaTeX記法に変換する関数
  const formatFraction = (problem: string) => {
    // 分数をディスプレイスタイルで表示するために、\displaystyle コマンドを使用します。
    // 例: '1/2' を '\displaystyle\frac{1}{2}' に変換します。
    return problem.replace(/(\d+)\/(\d+)/g, "\\displaystyle\\frac{$1}{$2}");
  };

  // 問題を適切なサイズのチャンクに分割する関数
  const chunkProblems = (problems: string[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < problems.length; i += chunkSize) {
      chunks.push(problems.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // 1ページあたりの問題数に基づいて、問題を分割する
  const problemChunks = chunkProblems(problems, problemsPerPage);

  return (
    <div>
      <h2>問題リスト</h2>
      {problemChunks.map((chunk, chunkIndex) => (
        <ProblemsContainer key={chunkIndex}>
          {chunk.map((problem, index) => {
            // 問題番号をページをまたいでも連続させる
            const problemNumber = chunkIndex * problemsPerPage + index + 1;
            return (
              <Problem key={index}>
                <strong>{problemNumber}. </strong>
                <InlineMath math={formatFraction(problem)} />
              </Problem>
            );
          })}
        </ProblemsContainer>
      ))}
    </div>
  );
};

export default ProblemList;
