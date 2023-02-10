import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";

function EmployerPaycheckHomePage(props){
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
        setEmployees(response.data);}

        const handleClick = (employee) => {
          navigate(`/create-paycheck/${employee.id}`, {
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
                      <button onClick={() => handleClick(employee)}>Create Paycheck</button>
                    </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployerPaycheckHomePage;