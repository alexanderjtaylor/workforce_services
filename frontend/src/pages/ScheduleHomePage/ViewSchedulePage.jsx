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
  var weekShifts = []

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
    setEmployeeShifts(response.data)
    console.log(employeeShifts)
    // weekShifts = filterDatesByCurrentWeek(response.data)
    // setEmployeeShifts(weekShifts);}
    ;}

    // function ValueSetter(){
    //   const findDate = new Date();
    //   const date = `${findDate.getFullYear()}-${findDate.getMonth()+1}-${findDate.getDate()}`;
    // }


// let d = new Date(shift.workDate);
// let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
// let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
// let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
// console.log(`${da}-${mo}-${ye}`);


// function getWeekDates() {
//   let now = new Date();
//   let dayOfWeek = now.getDay();
//   let numDay = now.getDate();               
//   let start = new Date(now);
//   start.setDate(numDay - dayOfWeek);
//   start.setHours(0, 0, 0, 0);                
//   let end = new Date(now);
//   end.setDate(numDay + (7 - dayOfWeek));
//   end.setHours(0, 0, 0, 0);
//   // console.log(start, end)
//   return [start, end];
// }

// function filterDatesByCurrentWeek(array){
//   let [start, end] = getWeekDates();
//   console.log(start, end)
//   let s = new Date(start)
//   let e = new Date(end)

//   let yea = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(e);
//   let mon = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(e);
//   let daa = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(e);
//   console.log(`${yea}-${mon}-${daa}`);
//   let st = (`${yea}-${mon}-${daa}`)

//   let yeaa = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(s);
//   let monn = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(s);
//   let daaa = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(s);
//   console.log(`${yeaa}-${monn}-${daaa}`);
//   let endd = (`${yeaa}-${monn}-${daaa}`)
  
  // let shiftStart = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(s);
  // let shiftEnd = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(e);




//   let foundShift = array.filter(function(shift){
//     if (shift.workDate < endd && shift.workDate >= st) {
//       return true;
//     }
//   });
//   return foundShift;
// }

// let [start, end] = getWeekDates();
// console.log(start.toLocaleString(), end.toLocaleString());

// function filterDatesByCurrentWeek(employeeShifts){
//   let [start, end] = getWeekDates();
//   let weekShifts = employeeShifts.filter(shift => + shift.workDate >= + start && + shift.workDate < + end);
//   console.log(weekShifts)
//   return weekShifts
// }

// function filterDatesByCurrentWeek(array){
//   let [start, end] = getWeekDates();
//   let filteredDates = array.filter((date) => {
//     if (date.scheduledStart < end && date.scheduledStart >= start) {
//       return true;
//     }
//   });
//   console.log(filteredDates)
//   return filteredDates;}



//   let foundShifts = array.filter(function(x){
//     if(shift => + shift.scheduledStart >= + start && + shift.scheduledEnd < + end){
//       return true;
//     }
//   });
//   return foundShifts;
// }

// filteredDates = employeeShifts.filter((date) => {
//   let [start, end] = getWeekDates();
//   if (date.scheduledStart < end.getTime() && date.scheduledStart() >= start.getTime()) {
//     return true;
//   } else {
//     return false;
//   }
// })

// function filteredDates(array){
//   let [start, end] = getWeekDates();
//   let foundShifts = array.filter(function(shift){
//     if (shift.scheduledStart < end && shift.scheduledStart >= start)
//     {
//       return true;
//     }
//   });
//   return foundShifts;
// }


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
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(s);
                let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(s);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(s);
                console.log(`${mo} ${da}, ${ye}`);
                let shiftStart = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(s);
                let shiftEnd = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric'}).format(e);

                

              //   function getWeekDates() {
              //     let dayOfWeek = d.getDay(); //0-6
              //     let numDay = d.getDate();               
              //     let start = new Date(d); //copy
              //     start.setDate(numDay - dayOfWeek);
              //     start.setHours(0, 0, 0, 0);                
              //     let end = new Date(d); //copy
              //     end.setDate(numDay + (7 - dayOfWeek));
              //     end.setHours(0, 0, 0, 0);
              //     return [start, end];
              //   }
                
              //   let [start, end] = getWeekDates();
              //   console.log(start.toLocaleString(), end.toLocaleString());

              //   function filterDatesByCurrentWeek(dates){
              //     let [start, end] = getWeekDates();
              //     return dates.filter(x => +x >= +start && +x < +end);
              //  }


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