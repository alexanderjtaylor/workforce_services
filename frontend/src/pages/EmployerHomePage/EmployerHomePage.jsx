import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployerHomePage = () => {
  const [user, token] = useAuth();
  const [employees, setEmployees] = useState([]);
  // const [employer, setEmployer] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}/employees`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchEmployees();
  }, [token]);
  return (
    <div className="container">
      <h1>Welcome {user.username}</h1>
      {employees &&
        employees.map((employee) => (
          <p key={employees.id}>
            {employee.firstName} {employee.lastName} {employee.dob} {employee.address} {employee.phoneNumber} {employee.employer.companyName} {employee.jobTitle} {employee.yearsWithCompany} {employee.sickTime} {employee.vacationTime}
          </p>))}
      <Link to="/add-employee">Add Employee</Link>
    </div>
  );
};

export default EmployerHomePage;
