import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployerHomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchEmployees();
  }, [token]);
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      <Link to="/add-employee">Add Employee</Link>
      {employees &&
        employees.map((employee) => (
          <p key={employees.id}>
            {employee.firstName} {employee.lastName} {employee.jobTitle}
          </p>
        ))}
    </div>
  );
};

export default EmployerHomePage;
