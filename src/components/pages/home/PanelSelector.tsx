import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import calender from "../../../assets/images/calender.svg";
import website from "../../../assets/images/website.svg";
import calc from "../../../assets/images/calc.svg";
import book from "../../../assets/images/book.svg";
import CellComponent from "../../ui/AnimatedCell";
import Modal from "../../ui/Modal";
import TeacherSelection from "./TeacherSelection/TeacherSelection";
import ComingSoonOverlay from "./ComingSoonOverlay";

const PanelContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  gap: 20px;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 8px;
  flex: 1;
  position: relative;

  h2 {
    font-size: 1.5rem;
  }
`;

const Icon = styled.img`
  width: 200px;
  height: 200px;
  transition: transform 0.3s ease;
  ${Panel}:hover & {
    transform: scale(1.1);
  }
`;

const PanelSelector: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <PanelContainer>
      <CellComponent>
        <Panel onClick={openModal}>
          <Icon src={calender} alt="Work Record Icon" />
          <h2>勤務記録</h2>
        </Panel>
      </CellComponent>
      <CellComponent>
        <Panel>
          {/* <Panel onClick={() => handleNavigate("/home-page-management")}> */}
          <Icon src={website} alt="Home Management Icon" />
          <h2>ホームページ</h2>
          <ComingSoonOverlay />
        </Panel>
      </CellComponent>
      <CellComponent>
        <Panel>
          <Icon src={book} alt="TermQuiz Generator Icon" />
          <h2>英単語問題</h2>
          <ComingSoonOverlay />
        </Panel>
      </CellComponent>
      <CellComponent>
        <Panel onClick={() => handleNavigate("/calculation-generator")}>
          <Icon src={calc} alt="Calculation Generator Icon" />
          <h2>計算問題</h2>
        </Panel>
      </CellComponent>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TeacherSelection />
      </Modal>
    </PanelContainer>
  );
};

export default PanelSelector;
