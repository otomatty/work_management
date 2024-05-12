import React, { useCallback, useState } from "react";
import styled from "styled-components";
import "katex/dist/katex.min.css"; // KaTeX CSSをインポート
import Container from "../../../layouts/Container";
import Wrapper from "../../../layouts/Wrapper";
import Chip from "../../../ui/Chip"; // Chip コンポーネントをインポート
import Description from "../../../ui/Description";
import MultiSelectTag from "../../../ui/MultiSelectTag";

const DescriptionBox = styled.div`
  display: flex;
`;

const NumberFormatToggle = ({
  selectedFormats: initialSelectedFormats,
  onSelect,
}) => {
  // 数のフォーマットとそれに対応するアイコンをTeX形式で定義
  const formats = [
    { label: "整数", icon: "\\text{1}" },
    { label: "分数", icon: "\\displaystyle\\frac{1}{2}" },
    { label: "少数", icon: "0.5" },
  ];

  // 初期状態では全てのフォーマットをfalse（非選択）とする
  const initialFormatStates = formats.reduce((acc, format) => {
    acc[format.label] = initialSelectedFormats.includes(format.label);
    return acc;
  }, {});

  const [selectedFormats, setSelectedFormats] = useState(initialFormatStates);

  const handleSelect = useCallback(
    (label) => {
      // 選択されたフォーマットの状態を反転させる
      const updatedFormats = {
        ...selectedFormats,
        [label]: !selectedFormats[label],
      };
      setSelectedFormats(updatedFormats);
      // onSelect コールバックを使用して親コンポーネントに選択状態を伝える
      // 選択されたフォーマットのみを配列で渡す
      onSelect(
        Object.keys(updatedFormats).filter((key) => updatedFormats[key]),
      );
    },
    [selectedFormats, onSelect],
  );

  return (
    <Container>
      <DescriptionBox>
        <Description number={2} text={"問題の「数の種類」を選択してください"} />
        <MultiSelectTag />
      </DescriptionBox>
      <Wrapper>
        {formats.map(({ label, icon }) => (
          <Chip
            key={label}
            icon={icon}
            label={label}
            checked={selectedFormats[label]}
            onChange={() => handleSelect(label)}
            fontSize="24px" // Chipにフォントサイズを指定
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export default NumberFormatToggle;
