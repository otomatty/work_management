import React from "react";
import TeacherManager from "./TeacherManager/TeacherManager";
import Header from "../../components/organisms/Header";
import styled from "styled-components";
import Container from "../../components/layout/Container";

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #333;
`;

const AdminDashboard: React.FC = () => {
  return (
    <Container>
      <Header />
      <Title>管理者ダッシュボード</Title>

      <TeacherManager />
      {/* 他の管理機能があればここに追加 */}
    </Container>
  );
};

export default AdminDashboard;
