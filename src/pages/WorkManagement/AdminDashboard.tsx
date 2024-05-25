import React from "react";
import { useNavigate } from "react-router-dom";
import TeacherManager from "./TeacherManager/TeacherManager";
import Button from "../../components/atoms/Button/Button";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Header>管理者ダッシュボード</Header>
      <ButtonContainer>
        <Button label="ホームに戻る" onClick={handleBackToHome} />
      </ButtonContainer>
      <TeacherManager />
      {/* 他の管理機能があればここに追加 */}
    </Container>
  );
};

export default AdminDashboard;
