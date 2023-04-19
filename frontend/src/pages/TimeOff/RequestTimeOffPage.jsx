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
        <Link to="/"><button className="back-btn">Back</button></Link>
        <p className="note">Please Note: Available time off balances do not account for pending requests. Available hours will update after employer approval.</p>
        <table>
          <thead>
            <tr className='table-col-center'>
              <th className='table-col-center'>Available Sick Time</th>
              <th className='table-col-center'>Available Vacation Time</th>
            </tr>
          </thead>
          <tbody>
                <tr className='table-row-center'>
                  <td className='table-row-center'>{employee.sickTime}</td>
                  <td className='table-row-center'>{employee.vacationTime}</td>
                  <button className='employer-pto-btns' onClick={() => handleClickone(employee)}>Request PTO</button>
                  <button className='employer-pto-btns' onClick={() => handleClicktwo(employee)}>View Requests</button>
                </tr>
          </tbody>
        </table>
      </div>
    );
};

export default RequestTimeOffPage;