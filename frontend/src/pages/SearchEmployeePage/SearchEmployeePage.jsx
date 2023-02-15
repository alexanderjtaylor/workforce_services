import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import DeleteEmployee from "../../components/DeleteEmployee/DeleteEmployee";
import EditEmployee from "../../components/EditEmployee/EditEmployee";

function SearchEmployeePage(){
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
        <Link to="/"><button className="home-btn">Home</button></Link>
        <SearchBar employees = {employees} setEmployees = {setEmployees} fetchEmployees = {fetchEmployees}/>
        <table className='profile-tabel'>
          <thead>
            <tr className='table-col'>
              <th className='table-col'>First Name</th>
              <th className='table-col'>Last Name</th>
              <th className='table-col'>Job Title</th>
              <th className='table-col'>Years with Company</th>
              <th className='table-col'>Pay Rate</th>
              <th className='table-col'>Overtime Rate</th>
              <th className='table-col'>Sick Time</th>
              <th className='table-col'>Vacation Time</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>{employee.firstName}</td>
                  <td className='table-row'>{employee.lastName}</td>
                  <td className='table-row'>{employee.jobTitle}</td>
                  <td className='table-row'>{employee.yearsWithCompany}</td>
                  <td className='table-row'>{employee.payRate}</td>
                  <td className='table-row'>{employee.OTPayRate}</td>
                  <td className='table-row'>{employee.sickTime}</td>
                  <td className='table-row'>{employee.vacationTime}</td>
                  <button className='home-page-btns' onClick={() => handleClick(employee)}>Edit Employee</button>
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