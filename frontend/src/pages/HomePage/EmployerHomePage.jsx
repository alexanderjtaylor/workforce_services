import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import GetEmployer from "../../components/GetEmployer/GetEmployer";

function EmployerHomePage(){
  const [user, token] = useAuth();
  const [employer, setEmployer] = useState([]);

  useEffect(() => {
    fetchEmployer();
  }, [token]);

  async function fetchEmployer(){
    const response = await axios.get(`http://127.0.0.1:8000/employers/${user.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data)
    setEmployer(response.data)}

  return (
    <div className="container">
      <h1>Welcome {user.username}</h1>
      {/* <GetEmployer employer = {employer} setEmployer = {setEmployer}/> */}
      {/* <h3>{employer.employer.companyName}</h3> */}
      <h3>Employees: {employer.employee_count}</h3>
      <Link to={{pathname:"/search-employee", state:{employer:true}}}><button>Search Employee</button></Link>
      {/* <Link to="/search-employee"><button>Search Employee</button></Link> */}
      <Link to="/schedule"><button>Schedule</button></Link>
      <Link to="/paycheck"><button>Paycheck</button></Link>
      <Link to="/time-off"><button>Time Off</button></Link>
      <Link to="/unassigned-users"><button>Unassigned Users</button></Link>
    </div>
  );
};

export default EmployerHomePage;