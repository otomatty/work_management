import React, { ReactNode } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Button from "../atoms/Button/Button"; // Added this line

interface ModalProps {
  isOpen: boolean;
  message?: string;
  onClose: () => void;
  children?: ReactNode;
  showCloseButton?: boolean;
}

interface ModalOverlayProps {
  $isOpen: boolean;
}

const ModalOverlay = styled(motion.div)<ModalOverlayProps>`
  display: flex;
  justify-content: center;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
`;

const ModalContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: center;
  min-width: 40%;
  border-radius: 8px;
  max-width: 500px;
  padding: 30px 15px;
  box-sizing: border-box;
  background: #fff;
  line-height: 1.4em;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  message,
  onClose,
  children,
  showCloseButton = true,
}) => {
  const { t } = useTranslation("components");

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const contentVariants = {
    hidden: { scale: 0.3 },
    visible: { scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <ModalOverlay
      $isOpen={isOpen}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      variants={overlayVariants}
    >
      <ModalContent
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={contentVariants}
      >
        {message && <p>{message}</p>}
        {children}
        {showCloseButton && (
          <ButtonContainer>
            <Button
              label={t("close")}
              onClick={onClose}
              backgroundColor="#3498db"
            />
          </ButtonContainer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
