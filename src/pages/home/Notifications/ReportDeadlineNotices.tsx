import React from "react";

// 仮の報告期限データ
const deadlines = [
  { id: 1, message: "月次報告の締切が近づいています。" },
  { id: 2, message: "勤務時間の報告期限は今週末です。" },
];

const ReportDeadlineNotices: React.FC = () => {
  return (
    <div>
      <h3>報告期限の通知</h3>
      <ul>
        {deadlines.map((deadline) => (
          <li key={deadline.id}>{deadline.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReportDeadlineNotices;
