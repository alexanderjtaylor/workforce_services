import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import DeleteEmployee from "../../components/DeleteEmployee/DeleteEmployee";
import EditEmployee from "../../components/EditEmployee/EditEmployee";

function SearchEmployeePage(props){
  const [user, token] = useAuth();
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState([]);

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
              <th>Job Title</th>
              <th>Years with Company</th>
              <th>Pay Rate</th>
              <th>OT Pay Rate</th>
              <th>Sick Time</th>
              <th>Vacation Time</th>
              <th>Edit Employee</th>
              <th>Delete Employee</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              // setEmployee(employee)
              return (
                <tr>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.jobTitle}</td>
                  <td>{employee.yearsWithCompany}</td>
                  <td>{employee.payRate}</td>
                  <td>{employee.OTPayRate}</td>
                  <td>{employee.sickTime}</td>
                  <td>{employee.vacationTime}</td>
                  <Link to={{pathname:"/edit-employee", state:{employees:true}}}><button>Edit Employee</button></Link>
                  {/* <EditEmployee employeeID = {employee.id} employeeFirstName = {employee.firstName} employeeLastName = {employee.lastName} employeeJobTitle = {employee.jobTitle} employeeYearsWithCompany = {employee.yearsWithCompany} employeePayRate = {employee.payRate} employeeOTPayRate = {employee.OTPayRate} employeeSickTime = {employee.sickTime} employeeVacationTime = {employee.vacationTime}/> */}
                  <DeleteEmployee employeeID = {employee.id} fetchEmployees = {fetchEmployees}/>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

export default SearchEmployeePage;