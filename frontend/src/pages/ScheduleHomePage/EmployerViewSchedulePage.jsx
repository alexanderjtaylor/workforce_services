import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import DeleteShift from "../../components/DeleteShift/DeleteShift";

const EmployerViewSchedulePage = () => {
  const [user, token] = useAuth();
  const [employeeShifts, setEmployeeShifts] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  // const [formData, handleInputChange, handleSubmit] = useCustomForm(state, EditEmployee);
  const {employeeID} = useParams();
  const [thisEmployee, setThisEmployee] = useState({});
  console.log(state)

  useEffect(() => {
    fetchEmployeeShifts();
  }, [token]);

  async function fetchEmployeeShifts(){
    const response = await axios.get(`http://127.0.0.1:8000/shifts/${state.employee_id}/shifts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setEmployeeShifts(response.data);}

    const handleClick = (shift) => {
      navigate(`/edit-shift/${shift.id}`, {
        state: {
          employee_id: shift.employee.id,
          shift_id: shift.id,
          workDate: shift.workDate,
          scheduledStart: shift.scheduledStart,
          scheduledEnd: shift.scheduledEnd,
          actualStart: shift.actualStart,
          actualEnd: shift.actualEnd,
          isHoliday: shift.isHoliday,
          isClockedIn: shift.isClockedIn
        }
      });
    };

  return (
      <div className="container">
      <Link to="/"><button>Home</button></Link>
      <h1>{state.firstName}'s Schedule</h1>
            <table className='prop-tabel'>
            <thead>
              <tr className='table-col'>
                <th className='table-col'>Shift ID</th>
                <th className='table-col'>Work Date</th>
                <th className='table-col'>Scheduled Start</th>
                <th className='table-col'>Scheduled End</th>
                {/* <th>Actual Start</th>
                <th>Actual End</th> */}
                {/* <th>Holiday</th> */}
                {/* <th>Clocked In</th> */}
              </tr>
            </thead>
            <tbody>
              {employeeShifts.map((shift) => {
                return (
                  <tr className='table-row'>
                    <td className='table-row'>{shift.id}</td>
                    <td className='table-row'>{shift.workDate}</td>
                    <td className='table-row'>{shift.scheduledStart}</td>
                    <td className='table-row'>{shift.scheduledEnd}</td>
                    {/* <td>{shift.actualStart}</td>
                    <td>{shift.actualEnd}</td> */}
                    {/* <td>{shift.isHoliday}</td> */}
                    {/* <td>{shift.isClockedIn}</td> */}
                    <button className='employer-home-page-btns' onClick={() => handleClick(shift)}>Edit Shift</button>
                    <td><DeleteShift shift_id = {shift.id} fetchEmployeeShifts = {fetchEmployeeShifts}/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
    </div>
  );
};

export default EmployerViewSchedulePage;