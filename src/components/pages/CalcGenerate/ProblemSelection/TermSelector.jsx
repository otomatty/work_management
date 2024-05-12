import React from "react";
import Container from "../../../layouts/Container";
import Wrapper from "../../../layouts/Wrapper";
import Description from "../../../ui/Description";
import SelectBox from "../../../ui/Selectbox";

// コンポーネント定義
const TermSelector = ({ selectedTerms, onSelect }) => {
  // セレクトボックスのオプション
  const options = [
    { value: "2", label: "2項" },
    { value: "3", label: "3項" },
    { value: "4", label: "4項" },
    { value: "5", label: "5項" },
  ];

  return (
    <Container>
      <Description
        number={4}
        text={"問題の項数を選択してください。"}
      ></Description>
      <Wrapper>
        <SelectBox
          options={options}
          defaultValue={selectedTerms}
          onChange={(e) => onSelect(e.target.value)}
        />
      </Wrapper>
    </Container>
  );
};

export default TermSelector;
