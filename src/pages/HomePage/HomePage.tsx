import React from "react";

import Header from "../../components/organisms/Header";
import MonthYearDisplay from "./MonthYearDisplay";
import Notifications from "./Notifications/Notifications";
import NavigationLink from "./NavigationLink";
import PanelSelector from "./PanelSelector"; // 新しいコンポーネントのインポート
import Container from "../../components/layout/Container";

const HomePage: React.FC = () => {
  return (
    <Container>
      <Header />
      <MonthYearDisplay />
      <Notifications />
      <PanelSelector />
      <NavigationLink />
    </Container>
  );
};

export default HomePage;
