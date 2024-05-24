import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate フックをインポート
import TeacherManager from "./TeacherManager/TeacherManager"; // TeacherManager コンポーネントのインポート
import Button from "../../components/atoms/Button"; // Button コンポーネントのインポート

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate(); // useNavigate フックを使用

  // ホーム画面に戻るための関数
  const handleBackToHome = () => {
    navigate("/"); // ホーム画面へリダイレクト
  };

  return (
    <div>
      <h1>管理者ダッシュボード</h1>
      <Button label="ホームに戻る" onClick={handleBackToHome} />
      <TeacherManager />
      {/* 他の管理機能があればここに追加 */}
    </div>
  );
};

export default AdminDashboard;
