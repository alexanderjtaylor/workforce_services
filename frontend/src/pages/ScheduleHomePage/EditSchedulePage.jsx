import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const EditSchedulePage = (props) => {

  const [user, token] = useAuth();
  const [employeeShifts, setEmployeeShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employer, setEmployer] = useState([]);

  useEffect(() => {
    
  }, [token]);

//   async function fetchEmployeeShifts(){
//     const response = await axios.get(`http://127.0.0.1:8000/shifts/${employee.id}/shifts`, {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     });
//     setEmployeeShifts(response.data);}


  return (
    <div className="container">
      {/* <h1>{employee.firstName}'s Scehdule</h1> */}
      <Link to="/search-employee"><button>Search Employee</button></Link>
      <Link to="/schedule"><button>Schedule</button></Link>
      <Link to="/paycheck"><button>Paycheck</button></Link>
      <Link to="/time-off"><button>Time Off</button></Link>
    </div>
  );
};

export default EditSchedulePage;