import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AssessmentPage from "./pages/AssessmentPage";
import HistoryPage from "./pages/HistoryPage";
import PatientsPage from "./pages/PatientsPage";
import PatientDetailPage from "./pages/PatientDetailPage";
import UsersPage from "./pages/UsersPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<HomePage />} />

          {/* All other routes include Navbar */}
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <DashboardPage />
              </>
            }
          />

          <Route
            path="/assessment"
            element={
              <>
                <Navbar />
                <AssessmentPage />
              </>
            }
          />

          <Route
            path="/history"
            element={
              <>
                <Navbar />
                <HistoryPage />
              </>
            }
          />

          <Route
            path="/patients"
            element={
              <>
                <Navbar />
                <PatientsPage />
              </>
            }
          />

          <Route
            path="/patient/:id"
            element={
              <>
                <Navbar />
                <PatientDetailPage />
              </>
            }
          />

          <Route
            path="/users"
            element={
              <>
                <Navbar />
                <UsersPage />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <ProfilePage />
              </>
            }
          />

          <Route
            path="/settings"
            element={
              <>
                <Navbar />
                <SettingsPage />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
