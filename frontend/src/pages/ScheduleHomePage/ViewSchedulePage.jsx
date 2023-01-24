import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewSchedulePage(){

  const [user, token] = useAuth();
  const [employees, setEmployees] = useState([]);
  const [employer, setEmployer] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, [token]);

  async function fetchEmployees(){
    const response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}/employees`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setEmployees(response.data);}


  return (
    <div className="container">
      <h1>Welcome {user.username}</h1>
      {/* <h3>{employer.employer.companyName}</h3>
      <h3>Employees: {employer.employee_count}</h3> */}
      <Link to="/search-employee"><button>Search Employee</button></Link>
      <Link to="/schedule"><button>Schedule</button></Link>
      <Link to="/paycheck"><button>Paycheck</button></Link>
      <Link to="/time-off"><button>Time Off</button></Link>
    </div>
  );
};

export default ViewSchedulePage;