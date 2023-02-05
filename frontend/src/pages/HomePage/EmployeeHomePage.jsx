import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeHomePage = (props) => {
  
  return (
    <div className="container">
      <h1>Welcome {props.employee.firstName}</h1>
          <p key={props.employee.id}>
            {props.employee.firstName} {props.employee.lastName} {props.employee.jobTitle} {props.companyName}
          </p>
      <Link to="/clock-in"><button>Clock</button></Link>
      <Link to="/schedule"><button>Schedule</button></Link>
      <Link to="/time-off"><button>Time Off</button></Link>
      <Link to="/paycheck"><button>Pay</button></Link>
    </div>
  );
};

export default EmployeeHomePage;