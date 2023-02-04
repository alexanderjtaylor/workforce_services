import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import GetEmployer from "../../components/GetEmployer/GetEmployer";

function EmployerHomePage(props){
  const [user, token] = useAuth();
  
  return (
    <div className="container">
      <h1>Welcome {user.username}</h1>
      <h3>{props.employer.company_name}</h3>
      <h3>Employees: {props.employer.employee_count}</h3>
      <Link to="/search-employee"><button>Search Employee</button></Link>
      <Link to="/schedule"><button>Schedule</button></Link>
      <Link to="/paycheck"><button>Paycheck</button></Link>
      <Link to="/time-off"><button>Time Off</button></Link>
      <Link to="/unassigned-users"><button>Unassigned Users</button></Link>
    </div>
  );
};

export default EmployerHomePage;