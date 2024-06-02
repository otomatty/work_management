import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import StyledButton from '../../components/atoms/StyledButton/StyledButton';
import { RootState } from '../../redux/store'; // RootStateをインポート
import {
  setDirection,
  decrementMonth,
  incrementMonth,
} from '../../redux/teacher/dateNavigationSlice'; // 必要なアクションをインポート

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const YearMonth = styled.h2`
  margin: 0 10px 0 0;
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
    '12月',
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
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
        {currentYear}年 {monthNames[(currentMonth + 1) % 12]}
      </YearMonth>
      <StyledButton
        label={
          <>
            <FaArrowLeft /> 前月
          </>
        }
        onClick={handlePreviousMonth}
      />

      <DisabledButton
        label={
          <>
            次月
            <FaArrowRight />
          </>
        }
        onClick={handleNextMonth}
        disabled={currentMonthIsThisMonth && currentYearIsThisYear}
      />
    </Container>
  );
};

export default MonthNavigation;
