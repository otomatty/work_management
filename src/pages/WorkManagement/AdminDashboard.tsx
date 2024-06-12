import React from "react";
import TeacherManager from "./TeacherManager/TeacherManager";
import Header from "../../components/organisms/Header";
import styled from "styled-components";
import Container from "../../components/layout/Container";
import Button from "../../components/atoms/Button/Button"; // Buttonコンポーネントをインポート
import SectionContainer from "../../components/layout/SectionContainer";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート

const Title = styled.h2`
  margin: 0 auto;
  font-size: 2.5em;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleSetPinClick = () => {
    navigate("/change-pin");
  };

  return (
    <Container>
      <SectionContainer>
        <Header />
      </SectionContainer>
      <SectionContainer>
        <Title>管理者用ダッシュボード</Title>
        <ButtonContainer>
          <Button label="PINコードを変更" onClick={handleSetPinClick} />
        </ButtonContainer>
      </SectionContainer>

      <SectionContainer>
        <TeacherManager />
      </SectionContainer>
      {/* 他の管理機能があればここに追加 */}
    </Container>
  );
};

export default AdminDashboard;
