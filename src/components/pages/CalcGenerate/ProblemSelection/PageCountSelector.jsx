import React from "react";
import Container from "../../../layouts/Container";
import Wrapper from "../../../layouts/Wrapper";
import Stepper from "../../../ui/Stepper"; // Stepper コンポーネントをインポート
import Description from "../../../ui/Description";

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
