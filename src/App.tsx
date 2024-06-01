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
import HomePage from "./pages/HomePage/HomePage";
import WorkRecord from "./pages/WorkRecord/WorkRecord";
import AdminDashboard from "./pages/WorkManagement/AdminDashboard";
import ProblemSelectionPage from "./pages/CalcGenerate/ProblemSelection/ProblemSelectionPage";
import ProblemConfirmPage from "./pages/CalcGenerate/ProblemConfirm/ProblemConfirmPage"; // Added
import ProblemSelection from "./pages/ThreeSubjectsTests/ProblemSelection";
import SubjectSelectorPage from "./pages/ThreeSubjectsTests/SubjectSelectorPage";
import LoginPage from "./pages/Login/LoginPage";
import LoadingAnimation from "./components/layout/LoadingAnimation";
import { AnimatePresence } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import ScrollToTop from "./components/atoms/ScrollToTop/ScrollToTop"; // ScrollToTopのインポート

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
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Set a minimum loading time for the animation
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (animationComplete && user !== undefined) {
      setLoading(false);
    }
  }, [animationComplete, user]);

  return (
    <>
      <GlobalStyle />
      <Router>
        <ScrollToTop /> {/* ScrollToTopコンポーネントを追加 */}
        <AnimatePresence>
          {loading ? <LoadingAnimation /> : null}
        </AnimatePresence>
        {!loading && (
          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<LoginPage />} />
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
              element={
                user ? <ProblemSelectionPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/confirm"
              element={user ? <ProblemConfirmPage /> : <Navigate to="/login" />}
            />
            <Route path="/subject-selector" element={<SubjectSelectorPage />} />
            <Route
              path="/problem-selection/:category"
              element={<ProblemSelection />}
            />
          </Routes>
        )}
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
