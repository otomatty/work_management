import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchTeachers } from "../../../firebase/teacherOperations";
import { useTranslation } from "react-i18next"; // i18nextのフックをインポート

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const NameSelector: React.FC<{
  onSelect: (id: string) => void;
}> = ({ onSelect }) => {
  const [teachers, setTeachers] = useState<{ id: string; name: string }[]>([]);
  const { t } = useTranslation(); // 翻訳関数の取得

  useEffect(() => {
    const loadTeachers = async () => {
      const fetchedTeachers = await fetchTeachers();
      setTeachers(fetchedTeachers);
    };

    loadTeachers();
  }, []);

  return (
    <SelectorContainer>
      <StyledSelect onChange={(e) => onSelect(e.target.value)}>
        <option value="">{t("selectName")} </option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </StyledSelect>
    </SelectorContainer>
  );
};

export default NameSelector;
