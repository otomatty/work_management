import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
`;

interface HeaderProps {
  title: string; // ページタイトルを受け取るプロパティ
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <Title>{title}</Title>
    </header>
  );
};

export default Header;
