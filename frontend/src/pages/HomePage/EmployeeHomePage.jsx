import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeHomePage = (props) => {
  const [user, token] = useAuth();
  
  return (
    <div className="container">
      <h1>Welcome {user.first_name}</h1>
          <p key={props.employee.id}>
            {props.employee.firstName} {props.employee.lastName} {props.employee.jobTitle} {props.companyName}
          </p>
      <Link to="/clock-in"><button>Clock In</button></Link>
      <Link to="/schedule"><button>Schedule</button></Link>
      <Link to="/paycheck"><button>Pay</button></Link>
      <Link to="/time-off"><button>Time Off</button></Link>
    </div>
  );
};

export default EmployeeHomePage;