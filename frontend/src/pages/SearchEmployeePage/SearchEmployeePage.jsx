import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import DisplayEmployees from "../../components/DisplayEmployees/DisplayEmployees";

const SearchEmployeePage = () => {
  const [user, token] = useAuth();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}/employees`, {
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
      <SearchBar employees = {employees} setEmployees = {setEmployees}/>
      {employees &&
        employees.map((employee) => (
          <p key={employees.id}>
            {employee.firstName} {employee.lastName} {employee.dob} {employee.address} {employee.phoneNumber} {employee.employer.companyName} {employee.jobTitle} {employee.yearsWithCompany} {employee.sickTime} {employee.vacationTime}
          </p>))}
      {/* <DisplayEmployees employees = {employees} setEmployees = {setEmployees}/> */}
      <Link to="/add-employee">Add Employee</Link>
    </div>
  );
};

export default SearchEmployeePage;