import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeHomePage = () => {
  const [user, token] = useAuth();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
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
    fetchEmployee();
  }, [token]);
  return (
    <div className="container">
      <h1>Welcome {user.first_name}</h1>
          <p key={employee.id}>
            {employee.firstName} {employee.lastName} {employee.dob} {employee.address} {employee.phoneNumber} {employee.jobTitle} {employee.yearsWithCompany} {employee.sickTime} {employee.vacationTime}
          </p>
      <Link to="/schedule">Schedule</Link>
      <Link to="/paycheck">Paycheck</Link>
      <Link to="/time-off">Time Off</Link>
    </div>
  );
};

export default EmployeeHomePage;