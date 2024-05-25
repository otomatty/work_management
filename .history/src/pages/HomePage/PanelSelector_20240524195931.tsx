import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next"; // i18nextのフックをインポート
import {
  calender,
  website,
  calc,
  book,
  filebox,
  printer,
} from "../../assets/images";
import CellComponent from "../../components/atoms/AnimatedCell/AnimatedCell";
import Modal from "../../components/molecules/Modal";
import TeacherSelection from "./TeacherSelection/TeacherSelection";
import ComingSoonOverlay from "./ComingSoonOverlay";

const CategoryTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const PanelContainer = styled.div`
  display: grid;
  margin: 20px;
  gap: 20px;
`;

const PanelWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch; // 子要素を等高にする
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
  height: 100%; // 高さを100%に設定して親要素に合わせる

  h2 {
    font-size: 1.5rem;
    min-height: 3rem; // h2の最小高さを設定
    width: 100%;
    text-align: center;
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
  const { t } = useTranslation("homePage"); // 翻訳関数の取得

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
      <CategoryTitle>業務管理</CategoryTitle>
      <PanelWrapper>
        <CellComponent>
          <Panel onClick={openModal}>
            <Icon src={calender} alt={t("workRecordIcon")} />
            <h2>{t("workRecord", { ns: "homePage" })}</h2>
          </Panel>
        </CellComponent>
        <CellComponent>
          <Panel>
            <Icon src={filebox} alt={t("studentManagementIcon")} />
            <h2>{t("studentManagement")}</h2>
            <ComingSoonOverlay />
          </Panel>
        </CellComponent>
        <CellComponent>
          <Panel>
            <Icon src={website} alt={t("homeManagementIcon")} />
            <h2>{t("homePage")}</h2>
            <ComingSoonOverlay />
          </Panel>
        </CellComponent>
      </PanelWrapper>
      <p>問題作成</p>
      <PanelWrapper>
        <CellComponent>
          <Panel onClick={() => handleNavigate("/calculation-generator")}>
            <Icon src={calc} alt={t("calculationGeneratorIcon")} />
            <h2>{t("calculationProblems")}</h2>
          </Panel>
        </CellComponent>
        <CellComponent>
          <Panel>
            <Icon src={book} alt={t("termQuizGeneratorIcon")} />
            <h2>{t("englishVocabularyProblems")}</h2>
            <ComingSoonOverlay />
          </Panel>
        </CellComponent>
        <CellComponent>
          <Panel>
            <Icon src={printer} alt={t("threeSubjectsProblemsIcon")} />
            <h2>{t("threeSubjectsProblems")}</h2>
            <ComingSoonOverlay />
          </Panel>
        </CellComponent>
      </PanelWrapper>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TeacherSelection />
      </Modal>
    </PanelContainer>
  );
};

export default PanelSelector;
