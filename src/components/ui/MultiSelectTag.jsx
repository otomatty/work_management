import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-flex; /* flexboxを使用して中央揃えを実現 */
  align-items: center; /* 垂直方向の中央揃え */
  justify-content: center; /* 水平方向の中央揃え */
  padding: 0 0.5rem; /* 文字の上下左右に余白を追加 */
  margin: 0.5rem;
  background-color: #ffebee; /* 薄い赤 */
  color: #d32f2f; /* より濃い赤 */
  border-radius: 4px;
  border: 1px solid #ffcdd2; /* 薄い赤のボーダー */
  font-size: 0.8rem;
  cursor: default;
`;

const Tag = styled.span`
  line-height: 1; /* spanタグのデフォルトのline-heightをリセット */
`;

const MultiSelectTag = () => {
  return (
    <Wrapper>
      <Tag>複数選択可</Tag>
    </Wrapper>
  );
};

export default MultiSelectTag;
