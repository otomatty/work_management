import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchTeachers } from "../../../../firebase/firestoreFunctions";

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
        <option value="">名前を選択する</option>
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
