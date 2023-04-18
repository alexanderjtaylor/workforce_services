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
        <Link to="/"><button className="back-btn">Back</button></Link>
        <SearchBar employees = {employees} setEmployees = {setEmployees} fetchEmployees = {fetchEmployees}/>
        <table>
          <thead>
            <tr className='table-col-center'>
              <th className='table-col-center'>Employee ID</th>
              <th className='table-col-center'>Name</th>
              <th className='table-col-center'>Job Title</th>
              <th className='table-col-center'>Years with Company</th>
              <th className='table-col-center'>Pay Rate</th>
              <th className='table-col-center'>OT Rate</th>
              <th className='table-col-center'>Sick Time</th>
              <th className='table-col-center'>Vacation Time</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr className='table-row'>
                  <td className='table-row-center'>{employee.id}</td>
                  <td className='table-row-center'>{employee.firstName} {employee.lastName}</td>
                  <td className='table-row-center'>{employee.jobTitle}</td>
                  <td className='table-row-center'>{employee.yearsWithCompany}</td>
                  <td className='table-row-center'>${employee.payRate}</td>
                  <td className='table-row-center'>${employee.OTPayRate}</td>
                  <td className='table-row-center'>{employee.sickTime}</td>
                  <td className='table-row-center'>{employee.vacationTime}</td>
                    <div className='edit-delete-employee'>
                  <button title="Edit employee" className='edit-delete-employee-btns' onClick={() => handleClick(employee)}>Edit</button>
                  <td><DeleteEmployee className="edit-delete-employee-btns" employeeID = {employee.id} fetchEmployees = {fetchEmployees}/></td>
                    </div>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

export default SearchEmployeePage;