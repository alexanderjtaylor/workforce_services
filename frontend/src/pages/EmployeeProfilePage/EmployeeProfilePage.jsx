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
        <Link to="/"><button className="back-btn">Back</button></Link>
        <table className='profile-tabel'>
          <thead>
            <tr className='table-col-center'>
              <th className='table-col-center'>Employee ID</th>
              <th className='table-col-center'>First Name</th>
              <th className='table-col-center'>Last Name</th>
              <th className='table-col-center'>Job Title</th>
              <th className='table-col-center'>Company</th>
              <th className='table-col-center'>Years at Company</th>
              <th className='table-col-center'>Pay Rate</th>
              <th className='table-col-center'>OT Rate</th>
              <th className='table-col-center'>Sick Time</th>
              <th className='table-col-center'>Vacation Time</th>
            </tr>
          </thead>
          <tbody>
                <tr className='table-row-center'>
                  <td className='table-row-center'>{employee.id}</td>
                  <td className='table-row-center'>{employee.firstName}</td>
                  <td className='table-row-center'>{employee.lastName}</td>
                  <td className='table-row-center'>{employee.jobTitle}</td>
                  <td className='table-row-center'>{companyName}</td>
                  <td className='table-row-center'>{employee.yearsWithCompany}</td>
                  <td className='table-row-center'>${employee.payRate}</td>
                  <td className='table-row-center'>${employee.OTPayRate}</td>
                  <td className='table-row-center'>{employee.sickTime}</td>
                  <td className='table-row-center'>{employee.vacationTime}</td>
                </tr>
          </tbody>
        </table>
      </div>
    );
};

export default EmployeeProfilePage;