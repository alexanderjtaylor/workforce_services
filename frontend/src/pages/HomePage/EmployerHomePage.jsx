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
      <Link title="View current employees" to="/search-employee"><button className='employer-home-page-btns'>Staff</button></Link>
      <Link title="Scheduling actions" to="/schedule"><button className='employer-home-page-btns'>Scheduling</button></Link>
      <Link title="Issue employee paychecks" to="/paycheck"><button className='employer-home-page-btns'>Pay</button></Link>
      <Link title="Respond to PTO requests" to="/time-off"><button className='employer-home-page-btns'>PTO Requests</button></Link>
      <Link title="Add new employees" to="/unassigned-users"><button className='employer-home-page-btns'>Find Employees</button></Link>
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
      </div >
  );
};

export default EmployerHomePage;