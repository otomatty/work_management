// 1か月ごとの勤務記録を表示・管理するためのカレンダーUI。出勤時間、退勤時間、生徒の出席情報の入力が可能です。
import React from "react";
import styled from "styled-components";
import MonthNavigation from "./MonthNavigation"; // MonthNavigationをインポート

const Container = styled.div`
  margin-bottom: 20px;
`;

interface CalendarHeaderProps {
  currentYear: number;
  currentMonth: number;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentYear,
  currentMonth,
}) => {
  return (
    <Container>
      <MonthNavigation />
      {/* ここにその他の情報を表示するためのコードやコンポーネントを配置 */}
      {/* 例: 現在の日付、特別な日のマーカー、ヘルプアイコンなど */}
    </Container>
  );
};

export default CalendarHeader;
