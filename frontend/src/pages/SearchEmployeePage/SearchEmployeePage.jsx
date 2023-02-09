import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import DeleteEmployee from "../../components/DeleteEmployee/DeleteEmployee";
import EditEmployee from "../../components/EditEmployee/EditEmployee";

function SearchEmployeePage(props){
  const [user, token] = useAuth();
  const navigate = useNavigate();
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
    console.log(response.data)
    setEmployees(response.data);}

    const handleClick = (employee) => {
      navigate(`/edit-employee/${employee.id}`, {
        state: {
          employee_id: employee.id,
          employer_id: employee.employer.id,
          user_id: employee.user.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          jobTitle: employee.jobTitle,
          yearsWithCompany: employee.yearsWithCompany,
          payRate: employee.payRate,
          OTPayRate: employee.OTPayRate,
          sickTime: employee.sickTime,
          vacationTime: employee.vacationTime
        }
      });
    };

    return (
      <div className="container">
        <Link to="/"><button>Home</button></Link>
        <SearchBar employees = {employees} setEmployees = {setEmployees} fetchEmployees = {fetchEmployees}/>
        <table className='prop-tabel'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
              <th>Years with Company</th>
              <th>Pay Rate</th>
              <th>Overtime Rate</th>
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
                  <td>{employee.jobTitle}</td>
                  <td>{employee.yearsWithCompany}</td>
                  <td>{employee.payRate}</td>
                  <td>{employee.OTPayRate}</td>
                  <td>{employee.sickTime}</td>
                  <td>{employee.vacationTime}</td>
                  <button onClick={() => handleClick(employee)}>Edit Employee</button>
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