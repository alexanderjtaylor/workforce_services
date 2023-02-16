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
import EmployerViewSchedulePage from "./pages/ScheduleHomePage/EmployerViewSchedulePage";
import ViewSchedulePage from "./pages/ScheduleHomePage/ViewSchedulePage";
import PaycheckHomePage from "./pages/PaycheckHomePage/PaycheckHomePage";
import EmployerPaycheckHomePage from "./pages/PaycheckHomePage/EmployerPaycheckHomePage";
import TimeOffHomePage from "./pages/TimeOffHomePage/TimeOffHomePage.jsx.jsx";
import UnassignedUsers from "./pages/UnassignedUsersPage/UnassignedUsersPage";
import CreatePayCheckPage from "./pages/PaycheckHomePage/CreatePaycheckPage";
import TimePunchPage from "./pages/TimePunches/TimePunchPage";
import ClockIn from "./pages/TimePunches/ClockIn";
import ClockOut from "./pages/TimePunches/ClockOut";
import GoToLunch from "./pages/TimePunches/ToLunch";
import ReturnLunch from "./pages/TimePunches/ReturnLunch";

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
        <Route path="/add-employee/:unassignedUserID" element={<PrivateRoute><AddEmployeePage /></PrivateRoute>} />
        <Route path="/edit-employee/:employeeID" element={<PrivateRoute><EditEmployeePage /></PrivateRoute>} />
        <Route path="/search-employee" element={<PrivateRoute><SearchEmployeePage /></PrivateRoute>} />
        <Route path="/schedule" element={<PrivateRoute><ScheduleHomePage /></PrivateRoute>} />
        <Route path="/employer-view-schedule/:employeeID" element={<PrivateRoute><EmployerViewSchedulePage /></PrivateRoute>} />
        <Route path="/view-schedule" element={<PrivateRoute><ViewSchedulePage /></PrivateRoute>} />
        <Route path="/set-schedule" element={<PrivateRoute><SetSchedulePage /></PrivateRoute>} />
        <Route path="/add-shift/:employeeID" element={<PrivateRoute><AddSchedulePage /></PrivateRoute>} />
        <Route path="/edit-shift/:shiftID" element={<PrivateRoute><EditSchedulePage /></PrivateRoute>} />
        <Route path="/paycheck" element={<PrivateRoute><PaycheckHomePage /></PrivateRoute>} />
        <Route path="/paycheck-employer-home" element={<PrivateRoute><EmployerPaycheckHomePage /></PrivateRoute>} />
        <Route path="/create-paycheck/:employeeID" element={<PrivateRoute><CreatePayCheckPage /></PrivateRoute>} />
        <Route path="/time-off" element={<PrivateRoute><TimeOffHomePage /></PrivateRoute>} />
        <Route path="/unassigned-users" element={<PrivateRoute><UnassignedUsers /></PrivateRoute>} />
        <Route path="/time-punch-page/:employeeID" element={<PrivateRoute><TimePunchPage /></PrivateRoute>} />
        <Route path="/clock-in/:shiftID" element={<PrivateRoute><ClockIn /></PrivateRoute>} />
        <Route path="/clock-out/:shiftID" element={<PrivateRoute><ClockOut /></PrivateRoute>} />
        <Route path="/clock-go-to-lunch/:shiftID" element={<PrivateRoute><GoToLunch /></PrivateRoute>} />
        <Route path="/clock-return-lunch/:shiftID" element={<PrivateRoute><ReturnLunch /></PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
