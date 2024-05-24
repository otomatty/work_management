import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface SnackbarProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const SnackbarContainer = styled(motion.div)`
  position: fixed;
  top: 20px; // ページの上部に表示
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const snackbarVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const Snackbar: React.FC<SnackbarProps> = ({ message, isVisible, onClose }) => {
  return (
    <SnackbarContainer
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={snackbarVariants}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {message}
    </SnackbarContainer>
  );
};

export default Snackbar;
