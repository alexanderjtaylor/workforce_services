import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import ViewPaycheck from "./ViewPaycheck";

const EmployeePaycheckHomePage = () => {
  const [user, token] = useAuth();
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

  return (
    <div className="container">
      <Link to="/"><button>Home</button></Link>
      <ViewPaycheck employee = {employee}/>
    </div>
  );
};

export default EmployeePaycheckHomePage;