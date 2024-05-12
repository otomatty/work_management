import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { User } from "firebase/auth";
import HomePage from "./components/pages/home/HomePage";
import TeacherSelectPage from "./components/pages/home/TeacherSelectPage";
import WorkRecord from "./components/pages/WorkRecord/WorkRecord";
import AdminDashboard from "./components/pages/WorkManagement/AdminDashboard";
import ProblemSelectionPage from "./components/pages/CalcGenerate/ProblemSelection/ProblemSelectionPage";
import LoginPage from "./components/pages/Login/LoginPage";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans JP', sans-serif;
    color: #333;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

 h1 {
  font-size: clamp(1.25rem, 3.5vw + 1rem, 2.25rem);
}

h2 {
  font-size: clamp(1.125rem, 3vw + 1rem, 2rem);
}

h3 {
  font-size: clamp(1rem, 2.5vw + 1rem, 1.75rem);
}

h4 {
  font-size: clamp(0.875rem, 2vw + 1rem, 1.5rem);
}

input,select {
    width: 100%; /* inputの幅をセルの幅に合わせる */
    box-sizing: border-box; /* パディングとボーダーを幅に含める */
}

`;

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/teacher-select"
            element={user ? <TeacherSelectPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/work-record/:teacherId"
            element={user ? <WorkRecordWrapper /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin-dashboard"
            element={user ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/calculation-generator"
            element={user ? <ProblemSelectionPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;

const WorkRecordWrapper: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  if (!teacherId) {
    return <div>講師IDが指定されていません。</div>;
  }
  return <WorkRecord selectedTeacherId={teacherId} />;
};
