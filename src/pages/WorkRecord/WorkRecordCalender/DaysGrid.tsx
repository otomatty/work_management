import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import DayCell from './DayCell';
import DayEditPanel from './DayEditPanel';
import Toolbar from './Toolbar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hook';
import { RootState } from '../../../redux/store';
import { fetchMonthlyWorkRecords } from '../../../redux/teacher/workRecordsSlice';
import { WorkRecord } from '../../../types';

interface DaysGridProps {
  year: number;
  month: number;
}

const Container = styled.div`
  margin: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin: 0 8px 0 4px;
`;

const DayOfWeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 8px;
`;

const DayOfWeek = styled.div`
  text-align: center;
  font-weight: bold;
`;

const calculateRowForEditDay = (
  editDay: number,
  year: number,
  month: number
): number => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const dayIndex = editDay - 1; // 0-based index
  return Math.floor((dayIndex + firstDayOfMonth) / 7) + 2;
};

const DaysGrid: React.FC<DaysGridProps> = ({ year, month }) => {
  const [editDay, setEditDay] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState(0);

  const dispatch = useAppDispatch();
  const workRecords = useSelector(
    (state: RootState) => state.workRecords.workRecords
  );
  const teacherId = useSelector((state: RootState) => state.teacher.teacherId);

  useEffect(() => {
    if (teacherId) {
      // console.log("Dispatching fetchMonthlyWorkRecords");
      dispatch(fetchMonthlyWorkRecords({ teacherId, year, month }));
    }
  }, [dispatch, teacherId, year, month]);

  const handleEditDay = async (day: number) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const currentRow =
      editDay !== null ? Math.floor((editDay - 1 + firstDayOfMonth) / 7) : -1;
    const newRow = Math.floor((day - 1 + firstDayOfMonth) / 7);

    if (editDay === day) {
      setSlideDirection(0);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setEditDay(null);
    } else if (currentRow === newRow && editDay !== null) {
      const direction = day > editDay ? 1 : -1;
      setSlideDirection(direction);
      setEditDay(day); // DayEditPanelを開いたままスライド
    } else {
      setEditDay(null);
      await new Promise((resolve) => setTimeout(resolve, 300));

      const element = document.querySelector(`#day-${day}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        await new Promise<void>((resolve) => {
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              resolve();
              observer.disconnect();
            }
          });
          observer.observe(element);
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      setSlideDirection(0);
      setEditDay(day);
    }
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const leadingEmptyDays = Array.from({ length: firstDayOfMonth }, () => null);

  return (
    <Container>
      <TitleContainer>
        <Title>勤務記録表</Title>
      </TitleContainer>
      <Toolbar year={year} month={month} />
      <DayOfWeekHeader>
        {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
          <DayOfWeek key={index}>{day}</DayOfWeek>
        ))}
      </DayOfWeekHeader>
      <GridContainer>
        {leadingEmptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const date = new Date(year, month, day);
          const dayOfWeek = date.getDay();
          const isEditDay = editDay === day;
          const workRecordsForDay = (workRecords[
            day.toString().padStart(2, '0')
          ] as WorkRecord) || {
            classroom: '',
            startTime: '',
            endTime: '',
            teachHour: 0,
            officeHour: 0,
            workDescription: '',
            lessonInfo: [],
          };
          return (
            <React.Fragment key={day}>
              <DayCell
                day={day}
                isSaturday={dayOfWeek === 6}
                isSunday={dayOfWeek === 0}
                year={year}
                month={month}
                workRecords={workRecordsForDay}
                onEdit={() => handleEditDay(day)}
              />
              <AnimatePresence>
                {isEditDay && editDay !== null && (
                  <DayEditPanel
                    year={year}
                    month={month}
                    key={editDay}
                    day={editDay}
                    workRecords={[workRecordsForDay]} // WorkRecord[] 型に変換
                    style={{
                      gridColumn: `1 / -1`,
                      gridRow: calculateRowForEditDay(editDay, year, month),
                    }}
                    slideDirection={slideDirection}
                  />
                )}
              </AnimatePresence>
            </React.Fragment>
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default DaysGrid;
