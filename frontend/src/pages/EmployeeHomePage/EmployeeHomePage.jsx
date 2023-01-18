import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeHomePage = () => {
  const [user, token] = useAuth();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/employees/12", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setEmployee(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchEmployee();
  }, [token]);
  return (
    <div className="container">
      <h1>Welcome {user.username}</h1>
      {employee &&
        employee.filter((employee) => (
          <p key={employee.id}>
            {employee.firstName} {employee.lastName} {employee.jobTitle}
          </p>
        ))}
    </div>
  );
};

export default EmployeeHomePage;