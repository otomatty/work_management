import React from "react";
import styled from "styled-components";
import Container from "../../../components/layout/Container";
import Wrapper from "../../../components/layout/Wrapper";

import RadioButton from "../../../components/atoms/RadioButton";
import Description from "../../../components/atoms/Description";
import ModalTooltip from "../../../components/atoms/ModalTooltip";

const DescriptionBox = styled.div`
  display: flex;
`;

// コンポーネント定義
const ProblemCountSelector = ({ selectedCount, onSelect }) => {
  const counts = [10, 20]; // 問題数の選択肢

  const handleChange = (e) => {
    onSelect(Number(e.target.value)); // 文字列を数値に変換
  };

  return (
    <Container>
      <DescriptionBox>
        <Description
          number={5}
          text={"1ページあたりの問題数を選択してください。"}
        ></Description>
        <ModalTooltip>
          <p>これはモーダルウィンドウの中のテキストです。</p>
          <img src="image_url_here" alt="説明画像" />
        </ModalTooltip>
      </DescriptionBox>
      <Wrapper flexDirection="column">
        {counts.map((count) => (
          <RadioButton
            key={count}
            label={`${count}問`}
            name="problemCount"
            value={count.toString()} // 明示的に文字列に変換
            checked={selectedCount.toString() === count.toString()} // 両方を文字列として比較
            onChange={handleChange}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export default ProblemCountSelector;
