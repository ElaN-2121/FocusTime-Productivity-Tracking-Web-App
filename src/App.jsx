import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./features/mentora/context/AppContext";
import Layout from "./features/mentora/components/Layout";

// Features
import HomePage from "./features/home/HomePage";
import Pomodoro from "./features/pomodoro/Pomodoro";
import TaskBoard from "./features/tasks/TaskBoard";
import Profile from "./features/auth/Profile";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ProgressPage from "./features/progress/components/ProgressPage";
import MentoraPage from "./features/mentora/pages/MentoraPage";

// Data
import { progressData } from "./data/mockData";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes wrapped in Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/focus" element={<Pomodoro />} />
            <Route path="/todo" element={<TaskBoard />} />
            <Route path="/progress" element={<ProgressPage data={progressData} />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Placeholders for missing features */}
            <Route path="/notes" element={<div style={{padding: 20}}>Notes Feature Coming Soon</div>} />
            <Route path="/youtube" element={<div style={{padding: 20}}>YouTube Feature Coming Soon</div>} />
            <Route path="/mentora" element={<MentoraPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
