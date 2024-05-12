import React from "react";

// 仮のお知らせデータ
const announcements = [
  { id: 1, message: "新しい機能がリリースされました。" },
  { id: 2, message: "システムメンテナンスのお知らせ。" },
];

const AdminAnnouncements: React.FC = () => {
  return (
    <div>
      <h3>管理者からのお知らせ</h3>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id}>{announcement.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAnnouncements;
