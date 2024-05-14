import React from "react";
import Container from "../../../components/layout/Container";
import Wrapper from "../../../components/layout/Wrapper";
import Stepper from "../../../components/atoms/Stepper"; // Stepper コンポーネントをインポート
import Description from "../../../components/atoms/Description";

// コンポーネント定義
const PageCountSelector = ({ selectedPageCount, onSelect }) => {
  // Stepperからの値の変更を処理する関数
  const handleValueChange = (newValue) => {
    onSelect(newValue);
  };

  return (
    <Container>
      <Description number={6} text={"作成するページ数を指定してください。"} />
      <Wrapper>
        <Stepper
          initialValue={selectedPageCount}
          onValueChange={handleValueChange}
        />
      </Wrapper>
    </Container>
  );
};

export default PageCountSelector;
