import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  margin-top: 40px;
  margin-left: 20px;
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
  return <StyledLink to="/admin-dashboard">管理画面へ</StyledLink>;
};

export default NavigationLink;
