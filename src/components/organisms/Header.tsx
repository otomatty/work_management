import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // i18nextのフックをインポート
import { motion } from 'framer-motion';
import LanguageSwitcher from '../molecules/LanguageSwitcher';
import logo from '../../logo.webp';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  text-align: center;
  margin: 0;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDiv = styled.div`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled(motion.img)`
  width: 3rem;
  transition: transform 0.3s ease;
`;

interface HeaderProps {
  disableLink?: boolean;
}

const Header: React.FC<HeaderProps> = ({ disableLink = false }) => {
  const { t } = useTranslation('layout'); // 翻訳関数の取得

  const imageVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <HeaderContainer>
      <Title whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {disableLink ? (
          <StyledDiv>
            <StyledImg
              src={logo}
              alt={t('logoAlt')}
              variants={imageVariants}
              whileHover="hover"
              whileTap="tap"
            />
            {t('schoolName')}
          </StyledDiv>
        ) : (
          <StyledLink to="/">
            <StyledImg
              src={logo}
              alt={t('logoAlt')}
              variants={imageVariants}
              whileHover="hover"
              whileTap="tap"
            />
            {t('schoolName')}
          </StyledLink>
        )}
      </Title>
      <LanguageSwitcher />
    </HeaderContainer>
  );
};

export default Header;
