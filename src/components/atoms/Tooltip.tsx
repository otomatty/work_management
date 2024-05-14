import React, { useState } from "react";
import styled from "styled-components";

interface TooltipProps {
  text: string;
  linkText?: string; // リンクとして扱うテキスト部分
  href?: string; // リンク先のURL
}

interface TooltipTextProps {
  $isVisible: boolean;
}

const TooltipContainer = styled.div`
  position: relative;
  display: flex;
  padding: 4px;
`;

const TooltipText = styled.div<TooltipTextProps>`
  display: flex;
  flex-direction: column;
  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
  width: 300px;
  background-color: #333;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1000;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem; // フォントサイズを1remに設定
  transition: visibility 0.5s ease-in-out;

  /* Tooltip arrow */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
    z-index: 999;
  }
`;

const StyledLink = styled.a`
  text-decoration: underline;
  color: #fff;
  &:hover {
    background-color: #555; // ホバー時の背景色変更
  }
`;

const QuestionMark = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #333; // 背景色を#333に設定
  color: white;
  border-radius: 50%; // 円形にする
  text-align: center;
  line-height: 24px; // 中央に配置
  font-size: 1rem; // フォントサイズを1remに設定
`;

const Tooltip: React.FC<TooltipProps> = ({ text, linkText, href }) => {
  const [isVisible, setIsVisible] = useState(false);
  let timeoutId: NodeJS.Timeout | null = null;

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (href) {
      const target = document.getElementById(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <TooltipContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <QuestionMark>?</QuestionMark>
      <TooltipText
        $isVisible={isVisible}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
        {linkText && href && (
          <StyledLink href={`#${href}`} onClick={handleClick}>
            {linkText}
          </StyledLink>
        )}
      </TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
