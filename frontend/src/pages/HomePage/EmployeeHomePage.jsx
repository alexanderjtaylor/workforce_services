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

  const handleClick = (employee) => {
    navigate(`/time-punch-page/${employee.id}`, {
      state: {
        employee_id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
      }
    });
  };
  
  return (
    <div className="employee-home-container">
      <h2 className="employee-home-welcome">Welcome {employee.firstName}</h2>
          <ul key={employee.id} className="employee-home-info">
            <li className="employee-home-info-name">{employee.firstName}</li>
            <li className="employee-home-info-name">{employee.lastName}</li>
            <li className="employee-home-info-data">{employee.jobTitle}</li>
            <li className="employee-home-info-data">{props.companyName}</li>
          </ul>
      <div className="home-page-btn-div">
      {/* <Link className='home-page-btns' to="/profile"><button>Profile</button></Link> */}
      <button className='home-page-btns' onClick={() => handleClick(employee)}>Profile</button>

      <button className='home-page-btns' onClick={() => handleClick(employee)}>Clock</button>
      {/* <Link to="/clock-in"><button>Clock</button></Link> */}
      <button className='home-page-btns' onClick={() => handleClick(employee)}>Schedule</button>
      <button className='home-page-btns' onClick={() => handleClick(employee)}>Time Off</button>
      <button className='home-page-btns' onClick={() => handleClick(employee)}>Pay</button>
      {/* <Link className='home-page-btns' to="/schedule"><button>Schedule</button></Link>
      <Link className='home-page-btns' to="/time-off"><button>Time Off</button></Link>
      <Link className='home-page-btns' to="/paycheck"><button>Pay</button></Link> */}
      </div>
    </div>
  );
};

export default EmployeeHomePage;