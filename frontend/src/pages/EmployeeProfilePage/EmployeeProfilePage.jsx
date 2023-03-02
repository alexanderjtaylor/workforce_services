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
        <Link to="/"><button className="home-btn">Home</button></Link>
        <table className='profile-tabel'>
          <thead>
            <tr className='table-col'>
              <th className='table-col'>Employee ID</th>
              <th className='table-col'>First Name</th>
              <th className='table-col'>Last Name</th>
              <th className='table-col'>Job Title</th>
              <th className='table-col'>Company</th>
              <th className='table-col'>Years at Company</th>
              <th className='table-col'>Pay Rate</th>
              <th className='table-col'>OT Rate</th>
              <th className='table-col'>Sick Time</th>
              <th className='table-col'>Vacation Time</th>
            </tr>
          </thead>
          <tbody>
                <tr className='table-row'>
                  <td className='table-row'>{employee.id}</td>
                  <td className='table-row'>{employee.firstName}</td>
                  <td className='table-row'>{employee.lastName}</td>
                  <td className='table-row'>{employee.jobTitle}</td>
                  <td className='table-row'>{companyName}</td>
                  <td className='table-row'>{employee.yearsWithCompany}</td>
                  <td className='table-row'>${employee.payRate}</td>
                  <td className='table-row'>${employee.OTPayRate}</td>
                  <td className='table-row'>{employee.sickTime}</td>
                  <td className='table-row'>{employee.vacationTime}</td>
                </tr>
          </tbody>
        </table>
      </div>
    );
};

export default EmployeeProfilePage;