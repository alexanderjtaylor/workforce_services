import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import ViewSchedulePage from "./ViewSchedulePage";

function SetSchedulePage(props){
  const [user, token] = useAuth();
  const [employeeShifts, setEmployeeShifts] = useState([]);
  // const [employees, setEmployees] = useState([]);
  const [employer, setEmployer] = useState([]);

  // useEffect(() => {
  //   // fetchEmployer();
  //   fetchEmployees();
  // }, [token]);

  useEffect(() => {
    fetchEmployeeShifts();
  }, [token]);

  async function fetchEmployeeShifts(){
    const response = await axios.get(`http://127.0.0.1:8000/shifts/${props.employeeID}/shifts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setEmployeeShifts(response.data);}

  // async function fetchEmployer(){
  //   const response = await axios.get(`http://127.0.0.1:8000/employers/${user.id}`, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  //   console.log(response.data)
  //   setEmployer(response.data)}

  // async function fetchEmployees(){
  //   const response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}/employees`, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  //   setEmployees(response.data);}

  // async function fetchEmployeeShifts(){
  //   const response = await axios.get(`http://127.0.0.1:8000/shifts/${employee.id}/shifts`, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  //   setEmployeeShifts(response.data);}

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
        <SearchBar employees = {props.employees} setEmployees = {props.setEmployees} fetchEmployees = {props.fetchEmployees}/>
        <table className='prop-tabel'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
              <th>View Schedule</th>
              <th>Add Shift</th>
              <th>Edit Shift</th>
            </tr>
          </thead>
          <tbody>
            {props.employees.map((employee) => {
              return (
                <tr>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.jobTitle}</td>
                  <Link to="/view-schedule"><button employeeID = {employee.id} employerID = {employee.employer.id} employeeFirstName = {employee.firstName} employeeLastName = {employee.lastName} employeeJobTitle = {employee.jobTitle} employeeYearsWithCompany = {employee.yearsWithCompany} employeeSickTime = {employee.sickTime} employeeVacationTime = {employee.vacationTime}>View Schedule</button></Link>
                  <Link to="/add-shift"><button employeeID = {employee.id} employerID = {employee.employer.id} employeeFirstName = {employee.firstName} employeeLastName = {employee.lastName} employeeJobTitle = {employee.jobTitle} employeeYearsWithCompany = {employee.yearsWithCompany} employeeSickTime = {employee.sickTime} employeeVacationTime = {employee.vacationTime}>Add Shift</button></Link>
                  <Link to="/edit-shift"><button employeeID = {employee.id} employerID = {employee.employer.id} employeeFirstName = {employee.firstName} employeeLastName = {employee.lastName} employeeJobTitle = {employee.jobTitle} employeeYearsWithCompany = {employee.yearsWithCompany} employeeSickTime = {employee.sickTime} employeeVacationTime = {employee.vacationTime} fetchEmployees = {props.fetchEmployees} employeeShifts = {employeeShifts} setEmployeeShifts = {setEmployeeShifts}>Edit Shift</button></Link>
                  {/* <Link to={{pathname:"/edit-employee", state:{employee:true}, state:{fetchEmployees:true}}}><button>Edit Shift</button></Link>            */}
                </tr>
              );
            })}
          </tbody>
        </table>
      <Link to="/"><button>Home</button></Link>
    </div>
  );
};

export default SetSchedulePage;