import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: 40px auto;
  max-width: 1200px;
  @media screen and (max-width: 600px) {
    max-width: 400px;
  }
`;

const Container = ({ children }: { children: React.ReactNode }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
