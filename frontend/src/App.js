// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddEmployeePage from "./pages/AddEmployeePage/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage/EditEmployeePage";
import SearchEmployeePage from "./pages/SearchEmployeePage/SearchEmployeePage";
import SchedulePage from "./pages/ScheduleHomePage/ScheduleHomePage";
import PaycheckHomePage from "./pages/PaycheckHomePage/PaycheckHomePage";
import TimeOffHomePage from "./pages/TimeOffHomePage/TimeOffHomePage.jsx.jsx";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

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
        <Route path="/schedule" element={<PrivateRoute><SchedulePage /></PrivateRoute>} />
        <Route path="/add-employee" element={<PrivateRoute><AddEmployeePage /></PrivateRoute>} />
        <Route path="/edit-employee" element={<PrivateRoute><EditEmployeePage /></PrivateRoute>} />
        <Route path="/search-employee" element={<PrivateRoute><SearchEmployeePage /></PrivateRoute>} />
        <Route path="/paycheck" element={<PrivateRoute><PaycheckHomePage /></PrivateRoute>} />
        <Route path="/time-off" element={<PrivateRoute><TimeOffHomePage /></PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
