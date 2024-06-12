import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import ProblemTypeToggle from "./ui/ProblemTypeToggle";
import NumberFormatToggle from "./ui/NumberFormatToggle";
import TermSelector from "./ui/TermSelector";
import ProblemCountSelector from "./ui/ProblemCountSelector";
import PageCountSelector from "./ui/PageCountSelector";
import IncludeNegativeNumbersToggle from "./ui/IncludeNegativeNumbersToggle";
import CreateProblemButton from "../../../components/molecules/CreateProblemButton";
import NoSelectionModal from "../../../components/atoms/NoSelectionModal/NoSelectionModal";
import Header from "../../../components/organisms/Header";
import Container from "../../../components/layout/Container";
import SectionContainer from "../../../components/layout/SectionContainer";
// その他のインポートは省略
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const PageContainer = styled.main`
  max-width: 1200px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SelectWrapper = styled.div`
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
  padding: 10px;
`;

const ProblemSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // useLocationフックを使用してlocationオブジェクトを取得

  // 「加法」と「整数」をデフォルト値として設定し、location.stateからの値があればそれを使用
  const [selectedTypes, setSelectedTypes] = useState(
    location.state?.selectedTypes || ["addition"]
  );
  const [selectedFormats, setSelectedFormats] = useState(
    location.state?.selectedFormats || ["integer"]
  );
  const [terms, setTerms] = useState(location.state?.terms || "2");
  const [problemCount, setProblemCount] = useState(10); // 初期値を数値に変更
  const [pageCount, setPageCount] = useState(location.state?.pageCount || "1");
  const [includeNegatives, setIncludeNegatives] = useState(
    location.state?.includeNegatives || false
  );
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの表示状態を管理

  useEffect(() => {
    if (location.state) {
      setSelectedTypes(location.state.selectedTypes || ["addition"]);
      setSelectedFormats(location.state.selectedFormats || ["integer"]);
      setTerms(location.state.terms || "2");
      setProblemCount(location.state.problemCount || "10");
      setPageCount(location.state.pageCount || "1");
      setIncludeNegatives(location.state.includeNegatives || false);
    }
  }, [location.state]);

  useEffect(() => {
    console.log("Selected Formats in ProblemSelectionScreen:", selectedFormats);
  }, [selectedFormats]);

  const handleToggleIncludeNegatives = () => {
    setIncludeNegatives(!includeNegatives);
    // console.log("Include Negatives Toggled:", !includeNegatives);
  };

  const handleSelectFormat = (formats: string[]) => {
    setSelectedFormats(formats);
    // console.log("Formats Selected:", formats);
  };

  const handleSelectProblemCount = (count: number) => {
    setProblemCount(count); // 直接数値を状態に設定
  };

  const handleCreateProblems = () => {
    if (selectedTypes.length === 0 || selectedFormats.length === 0) {
      // 問題が選択されていない場合
      setIsModalOpen(true); // モーダルを表示
      return; // ここで処理を終了
    }
    navigate("/confirm", {
      state: {
        selectedTypes,
        selectedFormats,
        terms,
        problemCount: problemCount.toString(), // 1ページあたりの問題数を文字列に変換
        includeNegatives,
        pageCount, // 追加: ページ数
      },
    });
  };

  return (
    <Container>
      <GlobalStyle />
      <SectionContainer>
        <Header />
      </SectionContainer>
      <PageContainer>
        <Title>出題する問題の形式を選択してください</Title>
        <SelectWrapper>
          <ProblemTypeToggle
            selectedTypes={selectedTypes}
            onSelect={(types: string[]) => {
              setSelectedTypes(types);
            }}
          />
          <NumberFormatToggle
            selectedFormats={selectedFormats}
            onSelect={handleSelectFormat}
          />
          <IncludeNegativeNumbersToggle
            includeNegatives={includeNegatives}
            onToggle={handleToggleIncludeNegatives}
          />
          <TermSelector
            selectedTerms={terms}
            onSelect={(terms: string) => {
              setTerms(terms);
            }}
          />
          <ProblemCountSelector
            selectedCount={problemCount}
            onSelect={handleSelectProblemCount}
          />
          <PageCountSelector
            selectedPageCount={pageCount}
            onSelect={(count) => {
              setPageCount(count);
            }}
          />
        </SelectWrapper>
        <CreateProblemButton
          selectedTypes={selectedTypes}
          selectedFormats={selectedFormats}
          terms={terms}
          problemCount={problemCount.toString()} // 1ページあたりの問題数を文字列に変換
          includeNegatives={includeNegatives}
          onCreateProblems={handleCreateProblems} // 修正: プロパティを更新
        />
      </PageContainer>
      <NoSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default ProblemSelectionPage;
