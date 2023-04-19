import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import DeleteShift from "../../components/DeleteShift/DeleteShift";

const EmployerViewSchedulePage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [employee, setEmployee] = useState([]);
  const [employeeShifts, setEmployeeShifts] = useState([]);
  var weekShifts = []
  const moment = require('moment');
  let dayOfWeek = moment().day();
  let numDay = moment().date(); 
  let start = new Date();
  let startWeekTitle = new Date();
  start.setDate((numDay - dayOfWeek) - 1);
  startWeekTitle.setDate((numDay - dayOfWeek));
  start.setHours(0, 0, 0, 0);
  let startOfWeek = moment(start).format("MM/DD/YYYY");
  let startOfWeekTitle = moment(startWeekTitle).format("MM/DD/YYYY");
  let end = new Date();
  let endWeekTitle = new Date();
  end.setDate(numDay + (7 - dayOfWeek));
  endWeekTitle.setDate(numDay + (6 - dayOfWeek));
  end.setHours(0, 0, 0, 0);
  let endOfWeek = moment(end).format("MM/DD/YYYY");
  let endOfWeekTitle = moment(endWeekTitle).format("MM/DD/YYYY");
  const startDate = moment(startOfWeek, "MM/DD/YYYY");  
  const endDate = moment(endOfWeek, "MM/DD/YYYY");  

  useEffect(() => {
    fetchEmployeeShifts();
    fetchEmployee();
  }, [token]);

  async function fetchEmployeeShifts(){
    const response = await axios.get(`http://127.0.0.1:8000/shifts/${state.employee_id}/shifts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response)
    setEmployeeShifts(thisWeeksShifts(response.data));
  }

  async function fetchEmployee(){
    const response = await axios.get(`http://127.0.0.1:8000/employees/employee/${state.employee_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // console.log(response.data)
    setEmployee(response.data.id)}

    function thisWeeksShifts(employeeShifts) {
      return employeeShifts.filter(shift => moment(shift.workDate).isBetween(startDate, endDate));}


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
          sickTimeUsed: shift.sickTimeUsed,
          vacationTimeUsed: shift.vacationTimeUsed,
          isHoliday: shift.isHoliday,
          isClockedIn: shift.isClockedIn
        }
      });
    };

    const handleClicktwo = (employee) => {
      navigate(`/employer-view-last-week-schedule/${employee.id}`, {
        state: {
          employee_id: employee.id,
        }
      });
    };

  return (
      <div className="container">
      <Link to="/schedule"><button className="home-btn">Back</button></Link>
      <Link to={`/employer-view-last-week-schedule/${state.employee_id}`} key={state.employee_id}><button className="toggle-schedule-btns">Last Week</button></Link>
      <Link to={`/employer-view-next-week-schedule/${state.employee_id}`} key={state.employee_id}><button className="toggle-schedule-btns">Next Week</button></Link>
      <h1 className="week-of">Schedule: {startOfWeekTitle} - {endOfWeekTitle}</h1>
            <table>
            <thead>
              <tr className='table-col'>
                <th className='table-col'>Shift ID</th>
                <th className='table-col'>Day</th>
                <th className='table-col'>Date</th>
                <th className='table-col'>Start</th>
                <th className='table-col'>End</th>
              </tr>
            </thead>
            <tbody>
              {employeeShifts.map((shift) => {
                let d = new Date(shift.workDate);
                let s = new Date(shift.scheduledStart);
                let e = new Date(shift.scheduledEnd);
                let shiftDayOfWeek = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(s);
                let shiftYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(s);
                let shiftMonth = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(s);
                let shiftDay = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(s);
                let shiftStart = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(s);
                let shiftEnd = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(e);

                return (
                  <tr className='table-row'>
                    <td className='table-row'>{shift.id}</td>
                    <td className='table-row'>{((`${shiftDayOfWeek}`))}</td>
                    <td className='table-row'>{((`${shiftMonth}/${shiftDay}/${shiftYear}`))}</td>
                    <td className='table-row'>{(shiftStart)}</td>
                    <td className='table-row'>{(shiftEnd)}</td>
                    <button className='edit-delete-shift-btns' onClick={() => handleClick(shift)}>Edit Shift</button>
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