import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";

function EmployerPaycheckHomePage(){
  const [user, token] = useAuth();
  const [employer, setEmployer] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployer();
    fetchEmployees();
  }, [token]);

  async function fetchEmployer(){
    const response = await axios.get(`http://127.0.0.1:8000/employers/${user.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data)
    setEmployer(response.data)}

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
            <th>Pay Rate</th>
            <th>Overtime Rate</th>
            <th>Sick Time</th>
            <th>Vacation Time</th>
            <th>Create Paycheck</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.jobTitle}</td>
                <td>{employee.payRate}</td>
                <td>{employee.OTPayRate}</td>
                <td>{employee.sickTime}</td>
                <td>{employee.vacationTime}</td>
                <Link to={{pathname:"/create-paycheck", state:{employer:true}, state:{employees:true}}}><button>Create Paycheck</button></Link>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployerPaycheckHomePage;