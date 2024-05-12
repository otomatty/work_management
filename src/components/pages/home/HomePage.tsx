import React from "react";
import styled from "styled-components";

import Header from "../../layouts/Header";
import MonthYearDisplay from "./MonthYearDisplay";
import Notifications from "./Notifications/Notifications";
import NavigationLink from "./NavigationLink";
import PanelSelector from "./PanelSelector"; // 新しいコンポーネントのインポート

const PageContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: auto;
`;

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Header title="佐藤英会話・五學塾 業務システム" />
      <MonthYearDisplay />
      <Notifications />
      <PanelSelector /> {/* パネル選択コンポーネントを表示 */}
      <NavigationLink />
    </PageContainer>
  );
};

export default HomePage;
