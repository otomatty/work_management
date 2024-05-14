import React from "react";
import styled from "styled-components";

const DescriptionBox = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-top: 10px;
`;

const Title = styled.span`
  display: block;
  text-align: left;
  font-size: 0.8rem;
`;

interface WorkDescriptionDisplayProps {
  description: string;
}

const WorkDescriptionDisplay: React.FC<WorkDescriptionDisplayProps> = ({
  description,
}) => {
  return (
    <>
      <Title>業務内容</Title>
      <DescriptionBox>{description}</DescriptionBox>
    </>
  );
};

export default WorkDescriptionDisplay;
