import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RequestTimeOffPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
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
  };

  const handleClickone = (employee) => {
    navigate(`/request-time-off/${employee.id}`, {
      state: {
      employee_id: employee.id,
      employer_id: employee.employer.id,
      user_id: employee.user.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobTitle: employee.jobTitle,
      sickTime: employee.sickTime,
      vacationTime: employee.vacationTime,
      payRate: employee.payRate,
      OTPayRate: employee.OTPayRate,
      }
    });
  };

  const handleClicktwo = (employee) => {
    navigate(`/pending-time-off-requests/${employee.id}`, {
      state: {
      employee_id: employee.id,
      employer_id: employee.employer.id,
      user_id: employee.user.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobTitle: employee.jobTitle,
      sickTime: employee.sickTime,
      vacationTime: employee.vacationTime,
      payRate: employee.payRate,
      OTPayRate: employee.OTPayRate,
      }
    });
  };

return (
    <div className="container">
        <Link to="/"><button className="home-btn">Home</button></Link>
        <p className="note">Please Note: Available time off balances do not account for any currently pending requests. Available hours will update after employer approval.</p>
        <table className='profile-tabel'>
          <thead>
            <tr className='table-col'>
              <th className='table-col'>First Name</th>
              <th className='table-col'>Last Name</th>
              <th className='table-col'>Sick Time Available</th>
              <th className='table-col'>Vacation Time Available</th>
            </tr>
          </thead>
          <tbody>
                <tr className='table-row'>
                  <td className='table-row'>{employee.firstName}</td>
                  <td className='table-row'>{employee.lastName}</td>
                  <td className='table-row'>{employee.sickTime}</td>
                  <td className='table-row'>{employee.vacationTime}</td>
                  <button className='employer-home-page-btns' onClick={() => handleClickone(employee)}>Request Time Off</button>
                  <button className='employer-home-page-btns' onClick={() => handleClicktwo(employee)}>View PTO Requests</button>
                </tr>
          </tbody>
        </table>
      </div>
    );
};

export default RequestTimeOffPage;