import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { WorkRecord } from '../../types';
import { getMonthlyWorkRecords } from '../../firebase/teachers/workRecords/workRecords';
import { saveTotalTimes } from '../../firebase/teachers/monthlySummaries/monthlySummaries';

interface MonthlySummaryProps {
  teacherId: string;
  year: number;
  month: number;
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({
  teacherId,
  year,
  month,
}) => {
  const [totalTeachTime, setTotalTeachTime] = useState(0);
  const [totalOfficeTime, setTotalOfficeTime] = useState(0);

  const calculateTotalTimes = useCallback(
    (workRecords: Record<string, WorkRecord | {}>) => {
      let teachTime = 0;
      let officeTime = 0;

      Object.values(workRecords).forEach((record) => {
        if (
          typeof record === 'object' &&
          'teachTime' in record &&
          'officeTime' in record
        ) {
          teachTime += record.teachTime || 0;
          officeTime += record.officeTime || 0;
        }
      });

      setTotalTeachTime(teachTime);
      setTotalOfficeTime(officeTime);

      saveTotalTimes(teacherId, year, month, teachTime, officeTime);
    },
    [teacherId, year, month]
  );

  useEffect(() => {
    const fetchMonthlyWorkRecords = async () => {
      const workRecords = await getMonthlyWorkRecords(teacherId, year, month);
      calculateTotalTimes(workRecords);
    };

    if (teacherId) {
      fetchMonthlyWorkRecords();
    }
  }, [teacherId, year, month, calculateTotalTimes]);

  // ReduxのworkRecordsが更新されたときに合計時間を再計算
  const workRecords = useSelector(
    (state: RootState) => state.workRecords.workRecords
  );
  useEffect(() => {
    calculateTotalTimes(workRecords);
  }, [workRecords, calculateTotalTimes]);

  return (
    <div>
      <h3>合計教務時間: {totalTeachTime} 分</h3>
      <h3>合計事務時間: {totalOfficeTime} 分</h3>
    </div>
  );
};

export default MonthlySummary;
