import React, { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  message?: string;
  onClose: () => void;
  children?: ReactNode;
  showCloseButton?: boolean; // 新しいプロパティを追加
}

interface ModalOverlayProps {
  $isOpen: boolean;
}

const ModalOverlay = styled.div<ModalOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #3498db;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  message,
  onClose,
  children,
  showCloseButton = true, // デフォルト値を設定
}) => {
  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContent>
        {message && <p>{message}</p>}
        {children}
        {showCloseButton && <CloseButton onClick={onClose}>閉じる</CloseButton>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
