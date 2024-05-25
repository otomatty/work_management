import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Simplified AnimatedCell that only handles animation
const AnimatedCell = styled(motion.div)`
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  width: 100%;
`;

interface AnimatedCellProps {
  children: React.ReactNode;
}

const CellComponent: React.FC<AnimatedCellProps> = ({ children }) => {
  return (
    <AnimatedCell
      whileHover={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.4)" }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </AnimatedCell>
  );
};

export default CellComponent;
