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
            <Link to="/"><button className="back-btn">Back</button></Link>
            <SearchBar employees = {employees} setEmployees = {setEmployees} fetchEmployees = {fetchEmployees}/>
            <table className='prop-tabel'>
              <thead>
                <tr className='table-col'>
                  <th className='table-col'>Name</th>
                  {/* <th className='table-col'>Last Name</th> */}
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
                    <tr className='table-row-center'>
                      <td className='table-row-center'>{employee.firstName} {employee.lastName}</td>
                      {/* <td className='table-row'>{employee.lastName}</td> */}
                      <td className='table-row-center'>{employee.jobTitle}</td>
                      <td className='table-row-center'>{employee.yearsWithCompany}</td>
                      <td className='table-row-center'>${employee.payRate}</td>
                      <td className='table-row-center'>${employee.OTPayRate}</td>
                      <td className='table-row-center'>{employee.sickTime}</td>
                      <td className='table-row-center'>{employee.vacationTime}</td>
                      <button className='employer-home-page-btns' onClick={() => handleClick(employee)}>Create Paycheck</button>
                    </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployerPaycheckHomePage;