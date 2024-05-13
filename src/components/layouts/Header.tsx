import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // i18nextのフックをインポート
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../../logo.webp";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 0;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 3rem;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { t } = useTranslation(); // 翻訳関数の取得

  return (
    <HeaderContainer>
      <Title>
        <StyledLink to="/">
          <img src={logo} alt={t("logoAlt")} /> {t("schoolName")}
        </StyledLink>
      </Title>
      <LanguageSwitcher />
    </HeaderContainer>
  );
};

export default Header;
