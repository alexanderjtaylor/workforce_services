import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";

function SetSchedulePage(){

  const [user, token] = useAuth();
  const [employeeShifts, setEmployeeShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employer, setEmployer] = useState([]);

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

//   async function fetchEmployeeShifts(){
//     const response = await axios.get(`http://127.0.0.1:8000/shifts/${employee.id}/shifts`, {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     });
//     setEmployeeShifts(response.data);}

//     async function fetchShift(){
//         const response = await axios.get(`http://127.0.0.1:8000/shifts/selected-shift/${shift.id}`, {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         fetchShift(response.data);}

//     async function addShift(){
//         const response = await axios.get(`http://127.0.0.1:8000/shifts/set/${employee.id}`, {
//             headers: {
//             Authorization: "Bearer " + token,
//             },
//         });
//         addShift(response.data);}

//     async function editShift(){
//         const response = await axios.get(`http://127.0.0.1:8000/shifts/edit/${shift.id}`, {
//             headers: {
//             Authorization: "Bearer " + token,
//             },
//         });
//         editShift(response.data);}

//     async function deleteShift(){
//         const response = await axios.get(`http://127.0.0.1:8000/shifts/edit/${shift.id}`, {
//             headers: {
//             Authorization: "Bearer " + token,
//             },
//         });
//         deleteShift(response.data);}

  return (
    <div className="container">
        <SearchBar employees = {employees} setEmployees = {setEmployees} fetchEmployees = {fetchEmployees}/>
        <table className='prop-tabel'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company Name</th>
              <th>Job Title</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.employer.companyName}</td>
                  <td>{employee.jobTitle}</td>
                </tr>
              );
            })}
          </tbody>
        </table>


      <Link to="/schedule"><button>Schedule</button></Link>
    </div>
  );
};

export default SetSchedulePage;