import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns'

const ViewSchedulePage = () => {
  const [user, token] = useAuth();
  const { state } = useLocation();
  const [employeeShifts, setEmployeeShifts] = useState([]);





  // const findDate = new Date();
  // const year  = findDate.getFullYear();
  // const month = (findDate.getMonth() + 1).toString().padStart(2, "0");
  // const day   = findDate.getDate().toString().padStart(2, "0");
  // const date = `${year}-${month}-${day}`;

  useEffect(() => {
    fetchEmployeeShifts();
    // ValueSetter();
  }, [token]);

  async function fetchEmployeeShifts(){
    const response = await axios.get(`http://127.0.0.1:8000/shifts/${state.employee_id}/shifts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data)
    setEmployeeShifts(response.data);}

    // function ValueSetter(){
    //   const findDate = new Date();
    //   const date = `${findDate.getFullYear()}-${findDate.getMonth()+1}-${findDate.getDate()}`;
    // }





// let d = new Date(shift.workDate);
// let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
// let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
// let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
// console.log(`${da}-${mo}-${ye}`);







  return (
      <div className="container">
      <Link to="/"><button className="home-btn">Home</button></Link>
      <h1 className="home-welcome">{state.firstName}'s Schedule</h1>
            <table className='profile-tabel'>
            <thead>
              <tr>
                <th className='table-col'>Work Date</th>
                <th className='table-col'>Scheduled Start</th>
                <th className='table-col'>Scheduled End</th>
                {/* <th>Actual Start</th>
                <th>Actual End</th>
                <th>Holiday</th>
                <th>Clocked In</th> */}
              </tr>
            </thead>
            <tbody>
              {employeeShifts.map((shift) => {
                let d = new Date(shift.workDate);
                let s = new Date(shift.scheduledStart);
                let e = new Date(shift.scheduledEnd);
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
                console.log(`${mo} ${da}, ${ye}`);
                let shiftStart = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(s);
                let shiftEnd = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(e);
                return (
                  <tr className='table-row'>
                    <td className='table-row'>{((`${mo} ${da}, ${ye}`))}</td>
                    <td className='table-row'>{(shiftStart)}</td>
                    <td className='table-row'>{(shiftEnd)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
    </div>
  );
};

export default ViewSchedulePage;