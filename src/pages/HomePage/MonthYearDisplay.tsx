import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next'; // i18nextのフックをインポート

const MonthYearContainer = styled.div`
  text-align: center;
  padding: 10px 0;
  font-size: 20px;
  color: #007bff;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MonthYearDisplay: React.FC = () => {
  const { i18n } = useTranslation('homePage'); // 翻訳コンテキストからi18nオブジェクトを取得
  const currentDate = new Date();
  const locale = i18n.language; // 現在の言語設定を取得
  const month = currentDate.toLocaleString(locale, { month: 'long' }); // ロケールに基づいた月の表示
  const year = currentDate.getFullYear();

  // 言語に応じた年月のフォーマット
  const formattedDate = locale.startsWith('ja')
    ? `${year}年 ${month}`
    : `${month} ${year}`;

  return <MonthYearContainer>{formattedDate}</MonthYearContainer>;
};

export default MonthYearDisplay;
