import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import GetEmployer from "../../components/GetEmployer/GetEmployer";

function EmployerHomePage(props){
  const [user, token] = useAuth();
  
  return (
    <div className="home-container">
      <h2 className="home-welcome">Welcome, {user.username}</h2>
      <p className="home-sub-header">{props.employer.company_name} Employees:{props.employer.employee_count}</p>
      <div className="employer-home-page-btn-div">
      <Link to="/search-employee"><button className='employer-home-page-btns'>Search Employee</button></Link>
      <Link to="/schedule"><button className='employer-home-page-btns'>Schedule</button></Link>
      <Link to="/paycheck"><button className='employer-home-page-btns'>Paycheck</button></Link>
      <Link to="/time-off"><button className='employer-home-page-btns'>Time Off</button></Link>
      <Link to="/unassigned-users"><button className='employer-home-page-btns'>Unassigned Users</button></Link>
      </div>
    </div>
  );
};

export default EmployerHomePage;