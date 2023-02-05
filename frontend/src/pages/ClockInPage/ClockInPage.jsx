import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import DateTime from "../../components/Clock/Clock";

const ClockInPage = () => {
  const [user, token] = useAuth();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    fetchEmployee();
  }, [token]);

  const fetchEmployee = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setEmployee(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };



  return (
    <div className="container">
      <h1>Welcome {user.first_name}</h1>
          <p key={employee.id}>
            {employee.firstName} {employee.lastName} {employee.jobTitle} {employee.yearsWithCompany} {employee.payRate} {employee.OTPayRate} {employee.sickTime} {employee.vacationTime}
          </p>
    <DateTime/>
    <Link to="/schedule"><button>Schedule</button></Link>
    <Link to="/paycheck"><button>Paycheck</button></Link>
    <Link to="/time-off"><button>Time Off</button></Link>
    </div>
  );
};

export default ClockInPage;