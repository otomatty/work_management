import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// スタイル定義
const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

const LanguageLink = styled.span<{ $active: boolean }>`
  cursor: pointer;
  margin: 0 10px;
  color: ${({ $active }) => ($active ? "#007bff" : "#333")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  text-decoration: ${({ $active }) => ($active ? "underline" : "none")};
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1000;
`;

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  const changeLanguage = (language: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      i18n.changeLanguage(language);
      setIsAnimating(false);
    }, 500); // アニメーションの時間に合わせる
  };

  return (
    <>
      <AnimatePresence>
        {isAnimating && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <SwitchContainer>
        <LanguageLink
          $active={i18n.language === "en"}
          onClick={() => changeLanguage("en")}
        >
          English
        </LanguageLink>
        |
        <LanguageLink
          $active={i18n.language === "ja"}
          onClick={() => changeLanguage("ja")}
        >
          日本語
        </LanguageLink>
      </SwitchContainer>
    </>
  );
};

export default LanguageSwitcher;
