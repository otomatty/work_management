import React from "react";
import styled from "styled-components";
import Container from "../../../layouts/Container";
import Wrapper from "../../../layouts/Wrapper";
import Chip from "../../../ui/Chip";
import Description from "../../../ui/Description";
import MultiSelectTag from "../../../ui/MultiSelectTag";

const DescriptionBox = styled.div`
  display: flex;
`;

const ProblemTypeToggle = ({ selectedTypes, onSelect }) => {
  // プロパティを受け取るように変更

  const toggleType = (type) => {
    let newTypes;
    if (selectedTypes.includes(type)) {
      newTypes = selectedTypes.filter((t) => t !== type);
    } else {
      newTypes = [...selectedTypes, type];
    }
    onSelect(newTypes); // 新しいselectedTypesを親コンポーネントに通知
  };

  // 四則演算のタイプとそれに対応するアイコン（またはシンボル）を定義
  const types = [
    { id: "addition", label: "加法", icon: "+" },
    { id: "subtraction", label: "減法", icon: "-" },
    { id: "multiplication", label: "乗法", icon: "×" },
    { id: "division", label: "除法", icon: "÷" },
  ];

  return (
    <Container>
      <DescriptionBox>
        <Description number={1} text={"問題の計算方法を選択してください"} />
        <MultiSelectTag />
      </DescriptionBox>
      <Wrapper>
        {types.map(({ id, label, icon }) => (
          <Chip
            key={id}
            icon={icon}
            label={label}
            checked={selectedTypes.includes(id)}
            onChange={() => toggleType(id)}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export default ProblemTypeToggle;
