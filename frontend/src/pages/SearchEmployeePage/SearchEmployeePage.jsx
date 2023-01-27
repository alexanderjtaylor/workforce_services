import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import Delete from "../../components/DeleteEmployee/DeleteEmployee";
import EditEmployeePage from "../EditEmployeePage/EditEmployeePage";

function SearchEmployeePage(){
  const [user, token] = useAuth();
  const [employees, setEmployees] = useState([]);

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
        <SearchBar employees = {employees} setEmployees = {setEmployees} fetchEmployees = {fetchEmployees}/>
        <table className='prop-tabel'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Years with Company</th>
              <th>Sick Time</th>
              <th>Vacation Time</th>
              <th>Edit Employee</th>
              <th>Delete Employee</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.address}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.employer.companyName}</td>
                  <td>{employee.jobTitle}</td>
                  <td>{employee.yearsWithCompany}</td>
                  <td>{employee.sickTime}</td>
                  <td>{employee.vacationTime}</td>
                  <Link to={{pathname:"/edit-employee", state:{employee:true}}}><button>Edit Employee</button></Link>
                  <Delete employeeID = {employee.id} fetchEmployees = {fetchEmployees}/>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="/add-employee"><button>Add Employee</button></Link>
      </div>
    );
};

export default SearchEmployeePage;