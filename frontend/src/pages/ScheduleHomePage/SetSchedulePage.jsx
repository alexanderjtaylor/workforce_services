import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import ViewSchedulePage from "./ViewSchedulePage";

function SetSchedulePage(){
  const [user, token] = useAuth();
  const navigate = useNavigate();
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
    console.log(response.data)
    setEmployees(response.data);}

const handleClickone = (employee) => {
  navigate(`/employer-view-schedule/${employee.id}`, {
    state: {
      employee_id: employee.id,
      employer_id: employee.employer.id,
      user_id: employee.user.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobTitle: employee.jobTitle,
    }
  });
};

const handleClicktwo = (employee) => {
  navigate(`/add-shift/${employee.id}`, {
    state: {
      employee_id: employee.id,
      employer_id: employee.employer.id,
      user_id: employee.user.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobTitle: employee.jobTitle,
    }
  });
};

const handleClickthree = (employee) => {
  navigate(`/edit-shift/${employee.id}`, {
    state: {
      employee_id: employee.id,
      employer_id: employee.employer.id,
      user_id: employee.user.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobTitle: employee.jobTitle,
    }
  });
};

  return (
    <div className="container">
      <Link to="/"><button className="home-btn">Home</button></Link>
        <SearchBar employees = {employees} setEmployees = {setEmployees} fetchEmployees = {fetchEmployees}/>
        <table className='prop-tabel'>
          <thead>
            <tr className='table-col'>
              <th className='table-col'>First Name</th>
              <th className='table-col'>Last Name</th>
              <th className='table-col'>Job Title</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>{employee.firstName}</td>
                  <td className='table-row'>{employee.lastName}</td>
                  <td className='table-row'>{employee.jobTitle}</td>
                  <button onClick={() => handleClickone(employee)}>View Schedule</button>
                  <button onClick={() => handleClicktwo(employee)}>Add Shift</button>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
  );
};

export default SetSchedulePage;