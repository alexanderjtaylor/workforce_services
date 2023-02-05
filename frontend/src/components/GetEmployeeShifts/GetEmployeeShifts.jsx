import axios from 'axios';
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const GetEmployeeShifts = (props) => {
    const [user, token] = useAuth();
    const [employeeShifts, setEmployeeShifts] = useState([]);

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

    return ( 
      <div className="container">
      <table className='prop-tabel'>
          <thead>
            <tr>
              <th>Shift ID</th>
              <th>Work Date</th>
              <th>Scheduled Start</th>
              <th>Scheduled End</th>
              <th>Actual Start</th>
              <th>Actual End</th>
              <th>Holiday</th>
              <th>Clocked In</th>
            </tr>
          </thead>
          <tbody>
            {employeeShifts.map((shift) => {
              return (
                <tr>
                  <td>{shift.id}</td>
                  <td>{shift.workDate}</td>
                  <td>{shift.scheduledStart}</td>
                  <td>{shift.scheduledEnd}</td>
                  <td>{shift.actualStart}</td>
                  <td>{shift.actualEnd}</td>
                  <td>{shift.isHoliday}</td>
                  <td>{shift.isClockedIn}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
  );
};
 
export default GetEmployeeShifts;