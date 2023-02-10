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
    <div className="container">
      <h1>Welcome {employee.firstName}</h1>
          <p key={employee.id}>
            {employee.firstName} {employee.lastName} {employee.jobTitle} {props.companyName}
          </p>
      <Link to="/profile"><button>Profile</button></Link>
      <button onClick={() => handleClick(employee)}>Clock</button>
      {/* <Link to="/clock-in"><button>Clock</button></Link> */}
      <Link to="/schedule"><button>Schedule</button></Link>
      <Link to="/time-off"><button>Time Off</button></Link>
      <Link to="/paycheck"><button>Pay</button></Link>
    </div>
  );
};

export default EmployeeHomePage;