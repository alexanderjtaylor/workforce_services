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
            <table>
              <thead>
                <tr className='table-col-center'>
                  <th className='table--center'>Name</th>
                  <th className='table-col-center'>Job Title</th>
                  <th className='table-col-center'>Pay Rate</th>
                  <th className='table-col-center'>PTO Hours Available</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                  let hoursAvailable = ((parseFloat(employee.sickTime))  + parseFloat(employee.vacationTime))
                  return (
                    <tr className='table-row-center'>
                      <td className='table-row-center'>{employee.firstName} {employee.lastName}</td>
                      <td className='table-row-center'>{employee.jobTitle}</td>
                      <td className='table-row-center'>${employee.payRate}</td>
                      <td className='table-row-center'>{hoursAvailable.toFixed(2)}</td>
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