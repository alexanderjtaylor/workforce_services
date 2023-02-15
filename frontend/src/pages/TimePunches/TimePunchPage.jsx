import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DateTime from "../../components/Clock/Clock";
import ClockIn from "./ClockIn";
import ClockOut from "../../components/ClockPunches/ClockOut";
import ToLunch from "../../components/ClockPunches/ToLunch";
import ReturnLunch from "../../components/ClockPunches/ReturnLunch";
import GetEmployeeShifts from "../../components/GetEmployeeShifts/GetEmployeeShifts";

const TimePunchPage = () => {
  const [user, token] = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [shift, setShift] = useState([]);
  const findDate = new Date();
  const date = `${findDate.getFullYear()}-${findDate.getMonth()+1}-${findDate.getDate()}`;

  useEffect(() => {
    fetchShift();
  }, [token]);

  const fetchShift = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/shifts/${state.employee_id}/shifts`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setShift(response.data.filter(shift.workDate = date))
      // setShifts(response.data);
      // setShift(shifts.filter(shift.workDate=today));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleClick = (shift) => {
    navigate(`/clock-in/${shift.id}`, {
      state: {
        shift_id: shift.id,
      }
    });
  };

  // getDate = () => {
  //   var today = new Date(),
 
  //   date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
 
  //   this.setState({ date });
  // };

  // shifts.filter(thisShift)

  // const fetchShift = async () => {
  //   try {
  //     let response = await axios.get(`http://127.0.0.1:8000/shifts/selected-shift/${shift.id}`, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     setShift(response.data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  return (
    <div className="container">
    <Link to="/"><button className="home-btn">Home</button></Link>
    <h3>{shift.data && shift.data.map((shift) => {
      return (
        <tr className='table-row'>
          <td className='table-row'>{shift.id}</td>
          <td className='table-row'>{shift.workDate}</td>
        </tr>
      );
    })}
    </h3>
    {/* <h3>Date: {shift.workDate}</h3> */}
    <DateTime/>
    <div className="time-punch-btns-div">
    <button className='home-page-btns' onClick={() => handleClick(shift)}>Clock In</button>
    <ClockOut employee = {employee} setEmployee = {setEmployee}/>
    <ToLunch employee = {employee} setEmployee = {setEmployee}/>
    <ReturnLunch employee = {employee} setEmployee = {setEmployee}/>
    </div>
    {/* <button onClick={() => handleClick(shift)}>Clock Out</button>
    <button onClick={() => handleClick(shift)}>Go to Lunch</button>
    <button onClick={() => handleClick(shift)}>Return from Lunch</button> */}
    {/* <h3>Status</h3>
    <p>{shift.isClockedIn}</p> */}
    {/* <ClockIn employee = {employee} setEmployee = {setEmployee}/> */}
    </div>
  );
};

export default TimePunchPage;