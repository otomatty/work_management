import React, { useState } from "react";

const TeacherRegistrationForm: React.FC = () => {
  const [teacherName, setTeacherName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!teacherName) {
      alert("講師名を入力してください。");
      return;
    }
    // APIを呼び出して講師を登録する
    const response = await fetch("api/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: teacherName }),
    });

    if (response.ok) {
      alert("講師が登録されました。");
      setTeacherName(""); // フォームをリセット
    } else {
      alert("講師の登録に失敗しました。");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="teacherName">講師名:</label>
      <input
        type="text"
        id="teacherName"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
        placeholder="講師の名前を入力"
      />
      <button type="submit">登録</button>
    </form>
  );
};

export default TeacherRegistrationForm;
