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
import TimeOffHomePage from "./pages/TimeOff/PTOHomePage.jsx";
import UnassignedUsers from "./pages/UnassignedUsersPage/UnassignedUsersPage";
import CreatePayCheckPage from "./pages/PaycheckHomePage/CreatePaycheckPage";
import TimePunchPage from "./pages/TimePunches/TimePunchPage";
import ClockIn from "./pages/TimePunches/ClockIn";
import ClockOut from "./pages/TimePunches/ClockOut";
import GoToLunch from "./pages/TimePunches/ToLunch";
import ReturnLunch from "./pages/TimePunches/ReturnLunch";
import RequestPTO from "./pages/TimeOff/RequestPTOPage";
import PendingPTORequests from "./pages/TimeOff/PendingRequests";
import ViewTimeOffRequests from "./pages/TimeOff/ViewTimeOffRequests";
import ApprovePTOPage from "./pages/TimeOff/ApprovePTO";
import DenyPTOPage from "./pages/TimeOff/DenyPTO";
import ViewNextWeekSchedulePage from "./pages/ScheduleHomePage/ViewNextWeekSchedulePage";
import ViewLastWeekSchedulePage from "./pages/ScheduleHomePage/ViewLastWeekSchedulePage";
import EmployerViewLastWeekSchedulePage from "./pages/ScheduleHomePage/EmployerViewLastWeekSchedulePage";
import EmployerViewNextWeekSchedulePage from "./pages/ScheduleHomePage/EmployerViewNextWeekSchedulePage";
import ViewPaycheck from "./pages/PaycheckHomePage/ViewPaycheck";
import ApprovePTOUpdateEmployee from "./pages/TimeOff/ApprovePTOUpdateEmployee";
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
        <Route path="/view-schedule/:employeeID" element={<PrivateRoute><ViewSchedulePage /></PrivateRoute>} />
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
        <Route path="/clock-out/:punchID" element={<PrivateRoute><ClockOut /></PrivateRoute>} />
        <Route path="/clock-go-to-lunch/:punchID" element={<PrivateRoute><GoToLunch /></PrivateRoute>} />
        <Route path="/clock-return-lunch/:punchID" element={<PrivateRoute><ReturnLunch /></PrivateRoute>} />
        <Route path="/request-time-off/:employeeID" element={<PrivateRoute><RequestPTO /></PrivateRoute>} />
        <Route path="/pending-time-off-requests/:employeeID" element={<PrivateRoute><PendingPTORequests /></PrivateRoute>} />
        <Route path="/view-pto-requests/:employerID" element={<PrivateRoute><ViewTimeOffRequests /></PrivateRoute>} />
        <Route path="/approve-pto/:paidtimeoffID" element={<PrivateRoute><ApprovePTOPage /></PrivateRoute>} />
        <Route path="/deny-pto/:paidtimeoffID" element={<PrivateRoute><DenyPTOPage /></PrivateRoute>} />
        <Route path="/next-week-schedule/:employeeID" element={<PrivateRoute><ViewNextWeekSchedulePage /></PrivateRoute>} />
        <Route path="/last-week-schedule/:employeeID" element={<PrivateRoute><ViewLastWeekSchedulePage /></PrivateRoute>} />
        <Route path="/employer-view-last-week-schedule/:employeeID" element={<PrivateRoute><EmployerViewLastWeekSchedulePage /></PrivateRoute>} />
        <Route path="/employer-view-next-week-schedule/:employeeID" element={<PrivateRoute><EmployerViewNextWeekSchedulePage /></PrivateRoute>} />
        <Route path="/view-paycheck" element={<PrivateRoute><ViewPaycheck /></PrivateRoute>} />
        <Route path="/pto-update-employee/:paidtimeoffID" element={<PrivateRoute><ApprovePTOUpdateEmployee /></PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
