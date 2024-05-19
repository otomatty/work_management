import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
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

interface DescriptionProps {
  number: number;
  text: string;
}

const Description = ({ number, text }: DescriptionProps) => {
  return (
    <Container>
      <Number>{number}</Number>
      <Text>{text}</Text>
    </Container>
  );
};

export default Description;
