import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  //   border-radius: 8px;
  //   background-color: #f0f0f0;
  //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Number = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

const Text = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const Description = ({ number, text }) => {
  return (
    <Container>
      <Number>{number}</Number>
      <Text>{text}</Text>
    </Container>
  );
};

export default Description;
