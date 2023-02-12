import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns'

const ViewSchedulePage = (props) => {
  const [user, token] = useAuth();
  const [employeeShifts, setEmployeeShifts] = useState([]);

  useEffect(() => {
    fetchEmployeeShifts();
    // ValueSetter();
  }, [token]);

  async function fetchEmployeeShifts(){
    const response = await axios.get(`http://127.0.0.1:8000/shifts/${props.employee.id}/shifts`, {
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

  return (
      <div className="container">
      <Link to="/"><button>Home</button></Link>
      <h1>{props.employee.firstName}'s Schedule</h1>
            <table className='prop-tabel'>
            <thead>
              <tr>
                <th>Work Date</th>
                <th>Scheduled Start</th>
                <th>Scheduled End</th>
                {/* <th>Actual Start</th>
                <th>Actual End</th>
                <th>Holiday</th>
                <th>Clocked In</th> */}
              </tr>
            </thead>
            <tbody>
              {employeeShifts.map((shift) => {
                return (
                  <tr>
                    {format(shift.workDate, 'mm/dd/yyyy')}
                    {format(shift.scheduledStart, 'kk:mm:ss')}
                    {format(shift.scheduledEnd, 'kk:mm:ss')}
                    {/* <td>{shift.workDate}</td>
                    <td>{shift.scheduledStart}</td>
                    <td>{shift.scheduledEnd}</td> */}
                    {/* <td>{shift.actualStart}</td>
                    <td>{shift.actualEnd}</td>
                    <td>{shift.isHoliday}</td>
                    <td>{shift.isClockedIn}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
    </div>
  );
};

export default ViewSchedulePage;