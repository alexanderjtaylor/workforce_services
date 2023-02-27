import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ViewPaycheck from "./ViewPaycheck";

const EmployeePaycheckHomePage = () => {
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
    navigate(`/view-paycheck/`, {
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
    <div className="container">
      <Link to="/"><button>Home</button></Link>
      <button className='employer-home-page-btns' onClick={() => handleClick(employee)}>View Paycheck</button>
      {/* <Link to="/view-paycheck" key={employee.id}><button>View Paycheck</button></Link> */}
      {/* <ViewPaycheck employee = {employee}/> */}
    </div>
  );
};

export default EmployeePaycheckHomePage;