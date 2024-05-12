import React from "react";
import styled from "styled-components";
import Container from "../../../layouts/Container";
import Wrapper from "../../../layouts/Wrapper";
import Checkbox from "../../../ui/Checkbox";
import Description from "../../../ui/Description";

// ラベルスタイルを更新
const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px; // チェックボックスとテキストの間に8pxのスペースを追加
`;

const IncludeNegativeNumbersToggle = ({ includeNegatives, onToggle }) => {
  return (
    <Container>
      <Description
        number={3}
        text={"問題に「負の数」を含む場合はチェックを入れてください。"}
      ></Description>
      <Wrapper>
        <StyledLabel>
          <Checkbox checked={includeNegatives} onChange={onToggle} />
          負の数を含む
        </StyledLabel>
      </Wrapper>
    </Container>
  );
};

export default IncludeNegativeNumbersToggle;
