import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // モーダルが他の要素より前面に来るように
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface NoSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoSelectionModal = ({ isOpen, onClose }: NoSelectionModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* モーダルの内容部分のクリックでモーダルが閉じないようにする */}
        <p>問題を選択してください。</p>
        <button onClick={onClose}>閉じる</button>
      </ModalContent>
    </ModalBackground>
  );
};

export default NoSelectionModal;
