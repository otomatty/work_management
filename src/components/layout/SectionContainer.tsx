import React from "react";
import styled from "styled-components";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

const StyledSectionContainer = styled.div`
  border-radius: 0.5rem; /* 角を丸くする */
  padding: 1rem; /* パディング */
  margin-bottom: 0.8rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* シャドウ */
  background-color: #fff;
`;

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <StyledSectionContainer className={className}>
      {children}
    </StyledSectionContainer>
  );
};

export default SectionContainer;
