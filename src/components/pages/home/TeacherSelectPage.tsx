import React, { useState, useEffect } from "react";
import TeacherSelection from "./TeacherSelection/TeacherSelection";
import { fetchTeachers } from "../../../firebase/firestoreFunctions";

const TeacherSelectPage: React.FC = () => {
  const [teachers, setTeachers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const loadTeachers = async () => {
      const loadedTeachers = await fetchTeachers();
      setTeachers(loadedTeachers);
    };
    loadTeachers();
  }, []);

  return (
    <div>
      <TeacherSelection />
    </div>
  );
};

export default TeacherSelectPage;
