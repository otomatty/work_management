import React, { useState, useEffect } from "react";

interface TeacherWorkSummaryProps {
  selectedMonth: string;
}

interface WorkRecord {
  teacherName: string;
  totalHours: number;
}

const TeacherWorkSummary: React.FC<TeacherWorkSummaryProps> = ({
  selectedMonth,
}) => {
  const [workRecords, setWorkRecords] = useState<WorkRecord[]>([]);

  useEffect(() => {
    if (selectedMonth) {
      fetchWorkRecords(selectedMonth);
    }
  }, [selectedMonth]);

  const fetchWorkRecords = async (month: string) => {
    // APIから勤務記録を取得する仮の関数
    // 実際にはAPIエンドポイントを呼び出す
    const response = await fetch(`api/work-records/${month}`);
    const data = await response.json();
    setWorkRecords(data);
  };

  return (
    <div>
      <h2>{selectedMonth}の勤務記録</h2>
      <table>
        <thead>
          <tr>
            <th>講師名</th>
            <th>合計勤務時間</th>
          </tr>
        </thead>
        <tbody>
          {workRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.teacherName}</td>
              <td>{record.totalHours}時間</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherWorkSummary;
