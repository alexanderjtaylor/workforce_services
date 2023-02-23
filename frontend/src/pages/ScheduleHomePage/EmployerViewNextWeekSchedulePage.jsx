import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns'
import DeleteShift from "../../components/DeleteShift/DeleteShift";

const EmployerViewNextWeekSchedulePage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {employeeID} = useParams();
  const [employeeShifts, setEmployeeShifts] = useState([]);
  var weekShifts = []
  const moment = require('moment');
  let dayOfWeek = moment().day();
  let numDay = moment().date(); 
  let start = new Date();
  let startWeekTitle = new Date();
  start.setDate((numDay - dayOfWeek) + 6);
  startWeekTitle.setDate((numDay - dayOfWeek) + 7);
  start.setHours(0, 0, 0, 0);
  let startOfWeek = moment(start).format("MM/DD/YYYY");
  let startOfWeekTitle = moment(startWeekTitle).format("MM/DD/YYYY");
  let end = new Date();
  let endWeekTitle = new Date();
  end.setDate(numDay + (14 - dayOfWeek));
  endWeekTitle.setDate(numDay + (13 - dayOfWeek));
  end.setHours(0, 0, 0, 0);
  let endOfWeek = moment(end).format("MM/DD/YYYY");
  let endOfWeekTitle = moment(endWeekTitle).format("MM/DD/YYYY");
  const startDate = moment(startOfWeek, "MM/DD/YYYY");  
  const endDate = moment(endOfWeek, "MM/DD/YYYY");
  

  useEffect(() => {
    fetchEmployeeShifts();
  }, [token]);

  async function fetchEmployeeShifts(){
    const response = await axios.get(`http://127.0.0.1:8000/shifts/${employeeID}/shifts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setEmployeeShifts(thisWeeksShifts(response.data))
    ;}
        
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
            isHoliday: shift.isHoliday,
            isClockedIn: shift.isClockedIn
          }
        });
      };

  return (
      <div className="container">
      <Link to="/"><button className="home-btn">Home</button></Link>
      <h1 className="home-welcome">Schedule: {startOfWeekTitle} - {endOfWeekTitle}</h1>
            <table className='profile-tabel'>
            <thead>
              <tr>
                <th className='table-col'>Work Date</th>
                <th className='table-col'>Scheduled Start</th>
                <th className='table-col'>Scheduled End</th>
              </tr>
            </thead>
            <tbody>
              {employeeShifts.map((shift) => {
                let d = new Date(shift.workDate);
                let s = new Date(shift.scheduledStart);
                let e = new Date(shift.scheduledEnd);
                let shiftDayOfWeek = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(s);
                let shiftYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(s);
                let shiftMonth = new Intl.DateTimeFormat('en', { month: 'long' }).format(s);
                let shiftDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(s);
                let shiftStart = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(s);
                let shiftEnd = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(e);
                // console.log(thisWeeksShifts(employeeShifts));

                return (
                  <tr className='table-row'>
                    <td className='table-row'>{((`${shiftDayOfWeek}, ${shiftMonth} ${shiftDay}, ${shiftYear}`))}</td>
                    <td className='table-row'>{(shiftStart)}</td>
                    <td className='table-row'>{(shiftEnd)}</td>
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

export default EmployerViewNextWeekSchedulePage;