import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next"; // Added

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  margin: 20px auto 0 20px;

  padding: 10px 20px;
  border: 2px solid #007bff;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const NavigationLink: React.FC = () => {
  const { t } = useTranslation("homePage"); // Get translation function

  return <StyledLink to="/admin-dashboard">{t("adminDashboard")}</StyledLink>; // Use translation key
};

export default NavigationLink;
