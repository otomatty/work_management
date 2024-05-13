import React from "react";
import styled, { css } from "styled-components";
import StyledButton from "../../ui/StyledButton";
import { useDispatch, useSelector } from "react-redux";
import { setDirection } from "../../../store/monthNavigationSlice";
import {
  incrementMonth,
  decrementMonth,
} from "../../../store/dateNavigationSlice";
import { RootState } from "../../../store/types"; // RootState のインポート

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const YearMonth = styled.h2`
  margin: 0;
  font-size: clamp(1.25rem, 4.5vw + 1rem, 2.5rem);
`;

const DisabledButton = styled(StyledButton)<{ disabled: boolean }>`
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: grey;
      cursor: not-allowed;
      &:hover {
        background-color: grey;
      }
    `}
`;

const MonthNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const { currentYear, currentMonth } = useSelector(
    (state: RootState) => state.dateNavigation
  );
  const today = new Date();
  const currentYearIsThisYear = currentYear === today.getFullYear();
  const currentMonthIsThisMonth = currentMonth === today.getMonth();

  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  const handlePreviousMonth = () => {
    dispatch(setDirection(-1));
    dispatch(decrementMonth());
  };

  const handleNextMonth = () => {
    if (!currentMonthIsThisMonth || !currentYearIsThisYear) {
      dispatch(setDirection(1));
      dispatch(incrementMonth());
    }
  };

  return (
    <Container>
      <YearMonth>
        {currentYear}年 {monthNames[currentMonth]}
      </YearMonth>
      <StyledButton label="前月" onClick={handlePreviousMonth} />

      <DisabledButton
        label="次月"
        onClick={handleNextMonth}
        disabled={currentMonthIsThisMonth && currentYearIsThisYear}
      />
    </Container>
  );
};

export default MonthNavigation;
