import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeHomePage = (props) => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
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

  const handleClickone = (employee) => {
    navigate(`/time-punch-page/${employee.id}`, {
      state: {
        employee_id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
      }
    });
  };

  const handleClicktwo = (employee) => {
    navigate(`/view-schedule/${employee.id}`, {
      state: {
        employee_id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
      }
    });
  };

  const handleClickthree = (employee) => {
    navigate(`/view-past-paychecks/${employee.id}`, {
      state: {
        employee_id: employee.id,
        employer_id: employee.employer.id,
        employer_name: employee.employer.companyName,
        user_id: employee.user.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
      }
    });
  };
  
  return (
    <div className="home-container">
      <h2 className="home-welcome">Welcome, {employee.firstName}</h2>
          <ul key={employee.id} className="employee-home-sub-header">
            <li className="employee-home-info">{employee.firstName} {employee.lastName}</li>
            <li className="employee-home-info">{employee.jobTitle}</li>
            <li className="employee-home-info">{props.companyName}</li>
          </ul>
      <div className="home-page-btn-div">
      <Link to="/profile"><button className='home-page-btns'>Profile</button></Link>
      <button className='home-page-btns' onClick={() => handleClickone(employee)}>Clock</button>
      <button className='home-page-btns' onClick={() => handleClicktwo(employee)}>Schedule</button>
      <Link to="/time-off"><button className='home-page-btns'>Time Off</button></Link>
      <button className='home-page-btns' onClick={() => handleClickthree(employee)}>Pay</button>
      </div>
      <div class="area">
        <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
      </div >
    </div>
  );
};

export default EmployeeHomePage;