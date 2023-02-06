import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeProfilePage = () => {
  const [user, token] = useAuth();
  const [employee, setEmployee] = useState([]);
  const [companyName, setCompanyName] = useState([]);

  useEffect(() => {
    fetchEmployee();
  }, [token]);

  const fetchEmployee = async () => {
    let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data)
    setCompanyName(response.data.employer.companyName)
    setEmployee(response.data);
  }

return (
    <div className="container">
        <Link to="/"><button>Home</button></Link>
        <table className='profile-tabel'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Years with Company</th>
              <th>Pay Rate</th>
              <th>Overtime Rate</th>
              <th>Sick Time</th>
              <th>Vacation Time</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.jobTitle}</td>
                  <td>{companyName}</td>
                  <td>{employee.yearsWithCompany}</td>
                  <td>{employee.payRate}</td>
                  <td>{employee.OTPayRate}</td>
                  <td>{employee.sickTime}</td>
                  <td>{employee.vacationTime}</td>
                </tr>
          </tbody>
        </table>
      </div>
    );
};

export default EmployeeProfilePage;