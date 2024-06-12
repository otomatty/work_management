import React from "react";

import Header from "../../components/organisms/Header";
import MonthYearDisplay from "./MonthYearDisplay";
import Notifications from "./Notifications/Notifications";
import NavigationLink from "./NavigationLink";
import PanelSelector from "./PanelSelector"; // 新しいコンポーネントのインポート
import Container from "../../components/layout/Container";
import SectionContainer from "../../components/layout/SectionContainer";

const HomePage: React.FC = () => {
  return (
    <Container>
      <SectionContainer>
        <Header />
      </SectionContainer>
      <SectionContainer>
        <MonthYearDisplay />
        <Notifications />
      </SectionContainer>
      <PanelSelector />
      <SectionContainer>
        <NavigationLink />
      </SectionContainer>
    </Container>
  );
};

export default HomePage;
