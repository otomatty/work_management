import React, { useState } from "react";
import styled from "styled-components";
import NameSelector from "./NameSelector";
import Button from "../../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // i18nextのフックをインポート

const TeacherSelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const TeacherSelection: React.FC = () => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null
  );
  const navigate = useNavigate();
  const { t } = useTranslation("homePage"); // 翻訳関数の取得

  const handleTeacherSelect = (id: string) => {
    setSelectedTeacherId(id);
  };

  const handleCheckCurrentRecord = () => {
    if (selectedTeacherId) {
      navigate(`/work-record/${selectedTeacherId}`);
    }
  };

  return (
    <TeacherSelectBox>
      <NameSelector onSelect={handleTeacherSelect} />
      <Button
        label={t("checkCurrentWorkRecord")} // 翻訳キーを使用
        onClick={handleCheckCurrentRecord}
      />
    </TeacherSelectBox>
  );
};

export default TeacherSelection;
