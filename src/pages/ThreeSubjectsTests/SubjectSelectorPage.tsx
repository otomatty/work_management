import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaFlask, FaGlobe, FaPenNib } from "react-icons/fa"; // アイコンのインポート
import Header from "../../components/organisms/Header";
import Container from "../../components/layout/Container";
import CellComponent from "../../components/atoms/AnimatedCell/AnimatedCell"; // AnimatedCellのインポート

const categories = [
  { name: "国語(漢字)", icon: <FaPenNib />, color: "#F44336" }, // 赤
  { name: "理科", icon: <FaFlask />, color: "#4CAF50" }, // 緑
  { name: "社会", icon: <FaGlobe />, color: "#FF9800" }, // オレンジ
];

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 60px;
  color: #333;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const CategoryButton = styled.button<{ selected: boolean; color: string }>`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-size: 2rem; // 文字サイズを大きく
  font-weight: bold; // 文字を太く
  color: ${({ color }) => color}; // 各教科の色を適用
  background-color: ${({ selected, color }) => (selected ? color : "#fff")};
  border: 2px solid ${({ selected, color }) => (selected ? color : "#ccc")};
  border-radius: 8px; // カード型にするために角を丸く
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // カード型にするための影
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ selected, color }) => (selected ? color : "#bbb")};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); // ホバー時の影

    svg {
      transform: scale(1.2); // ホバー時にSVGアイコンを拡大
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }

  svg {
    margin-bottom: 30px;
    font-size: 5rem; // アイコンのサイズを大きく
    color: ${({ color }) => color}; // アイコンの色も変更
    transition: transform 0.3s ease; // SVGアイコンの拡大アニメーション
  }
`;

const SubjectSelectorPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();

  const handleSelectSubject = (category: string) => {
    setSelectedCategory(category);
    navigate(`/problem-selection/${category}`);
  };

  return (
    <Container>
      <Header />
      <PageContainer>
        <Title>教科を選択</Title>
        <ButtonGrid>
          {categories.map((category) => (
            <CellComponent key={category.name}>
              <CategoryButton
                selected={selectedCategory === category.name}
                color={category.color}
                onClick={() => handleSelectSubject(category.name)}
              >
                {category.icon}
                {category.name}
              </CategoryButton>
            </CellComponent>
          ))}
        </ButtonGrid>
      </PageContainer>
    </Container>
  );
};

export default SubjectSelectorPage;
