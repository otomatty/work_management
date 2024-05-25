import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import RadioButton from "../atoms/RadioButton/RadioButton";

const Container = styled.div`
  margin-bottom: 10px;
`;

const RadioGroup = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
`;

const RadioItem = styled.div`
  margin-bottom: 10px;
`;

interface GradeSelectorProps {
  grade: string;
  setGrade: (grade: string) => void;
}

const gradeCategories = {
  未就学: ["年少", "年中", "年長"],
  小学生: ["小学1年", "小学2年", "小学3年", "小学4年", "小学5年", "小学6年"],
  中学生: ["中学1年", "中学2年", "中学3年"],
  高校生: ["高校1年", "高校2年", "高校3年"],
  社会人: ["社会人"],
};

const GradeSelector: React.FC<GradeSelectorProps> = ({ grade, setGrade }) => {
  const handleGradeChange = (newGrade: string) => {
    setGrade(newGrade);
  };

  return (
    <Container>
      <RadioGroup
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {Object.entries(gradeCategories).map(([category, grades]) => (
          <RadioItem key={category}>
            <strong>{category}</strong>
            {grades.map((g) => (
              <RadioButton
                key={g}
                label={g}
                name="grade"
                value={g}
                checked={grade === g}
                onChange={() => handleGradeChange(g)}
              />
            ))}
          </RadioItem>
        ))}
      </RadioGroup>
    </Container>
  );
};

export default GradeSelector;
