import React from "react";
import styled from "styled-components";
import Container from "../../../../components/layout/Container";
import Wrapper from "../../../../components/layout/Wrapper";
import Checkbox from "../../../../components/atoms/Checkbox/Checkbox";
import Description from "../../../../components/atoms/Description/Description";

// ラベルスタイルを更新
const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px; // チェックボックスとテキストの間に8pxのスペースを追加
`;

interface IncludeNegativeNumbersToggleProps {
  includeNegatives: boolean;
  onToggle: () => void; // ここでonToggleの型を指定
}

const IncludeNegativeNumbersToggle = ({
  includeNegatives,
  onToggle,
}: IncludeNegativeNumbersToggleProps) => {
  return (
    <Container>
      <Description
        number={3}
        text={"問題に「負の数」を含む場合はチェックを入れてください。"}
      ></Description>
      <Wrapper>
        <StyledLabel>
          <Checkbox
            checked={includeNegatives}
            onChange={onToggle}
            className=""
          />
          負の数を含む
        </StyledLabel>
      </Wrapper>
    </Container>
  );
};

export default IncludeNegativeNumbersToggle;
