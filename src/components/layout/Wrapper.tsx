import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div<{
  $flexDirection?: string;
  justifyContent?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection || "row"};
  flex-wrap: wrap;
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: flex-start;
  padding: 10px 20px 20px 20px;
  gap: 10px;
`;

interface WrapperProps {
  children: ReactNode;
  flexDirection?: string;
  justifyContent?: string;
}

const Wrapper = ({ children, flexDirection, justifyContent }: WrapperProps) => {
  return (
    <StyledWrapper
      $flexDirection={flexDirection}
      justifyContent={justifyContent}
    >
      {children}
    </StyledWrapper>
  );
};

export default Wrapper;
