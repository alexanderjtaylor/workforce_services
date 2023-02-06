// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage/EmployeeProfilePage";
import AddEmployeePage from "./pages/AddEmployeePage/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage/EditEmployeePage";
import SearchEmployeePage from "./pages/SearchEmployeePage/SearchEmployeePage";
import ScheduleHomePage from "./pages/ScheduleHomePage/ScheduleHomePage";
import SetSchedulePage from "./pages/ScheduleHomePage/SetSchedulePage";
import ViewSchedulePage from "./pages/ScheduleHomePage/ViewSchedulePage";
import PaycheckHomePage from "./pages/PaycheckHomePage/PaycheckHomePage";
import TimeOffHomePage from "./pages/TimeOffHomePage/TimeOffHomePage.jsx.jsx";
import UnassignedUsers from "./pages/UnassignedUsersPage/UnassignedUsersPage";
import CreatePayCheckPage from "./pages/PaycheckHomePage/CreatePaycheckPage";
import ClockInPage from "./pages/ClockInPage/ClockInPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import AddSchedulePage from "./pages/ScheduleHomePage/AddSchedulePage";
import EditSchedulePage from "./pages/ScheduleHomePage/EditSchedulePage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<PrivateRoute><EmployeeProfilePage /></PrivateRoute>} />
        <Route path="/add-employee" element={<PrivateRoute><AddEmployeePage /></PrivateRoute>} />
        <Route path="/edit-employee" element={<PrivateRoute><EditEmployeePage /></PrivateRoute>} />
        <Route path="/search-employee" element={<PrivateRoute><SearchEmployeePage /></PrivateRoute>} />
        <Route path="/schedule" element={<PrivateRoute><ScheduleHomePage /></PrivateRoute>} />
        <Route path="/view-schedule" element={<PrivateRoute><ViewSchedulePage /></PrivateRoute>} />
        <Route path="/set-schedule" element={<PrivateRoute><SetSchedulePage /></PrivateRoute>} />
        <Route path="/add-shift" element={<PrivateRoute><AddSchedulePage /></PrivateRoute>} />
        <Route path="/edit-shift" element={<PrivateRoute><EditSchedulePage /></PrivateRoute>} />
        <Route path="/paycheck" element={<PrivateRoute><PaycheckHomePage /></PrivateRoute>} />
        <Route path="/create-paycheck" element={<PrivateRoute><CreatePayCheckPage /></PrivateRoute>} />
        <Route path="/time-off" element={<PrivateRoute><TimeOffHomePage /></PrivateRoute>} />
        <Route path="/unassigned-users" element={<PrivateRoute><UnassignedUsers /></PrivateRoute>} />
        <Route path="/clock-in" element={<PrivateRoute><ClockInPage /></PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
