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
  const [shifts, setShifts] = useState([]);
  const [shift, setShift] = useState([]);
  const [today, setToday] = useState([]);
  // setToday( new Date)

  useEffect(() => {
    fetchShifts();
  }, [token]);

  // const fetchEmployee = async () => {
  //   try {
  //     let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}`, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     setEmployee(response.data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  const fetchShifts = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/shifts/${state.employee_id}/shifts`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setShifts(response.data);
      setShift(shifts.filter(shift.workDate=today));
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
    <Link to="/"><button>Home</button></Link>
    <h1>Welcome {state.firstName}</h1>
    <DateTime/>
    <button onClick={() => handleClick(shift)}>Clock In</button>
    {/* <button onClick={() => handleClick(shift)}>Clock Out</button>
    <button onClick={() => handleClick(shift)}>Go to Lunch</button>
    <button onClick={() => handleClick(shift)}>Return from Lunch</button> */}
    {/* <h3>Status</h3>
    <p>{shift.isClockedIn}</p> */}
    {/* <ClockIn employee = {employee} setEmployee = {setEmployee}/> */}
    <ClockOut employee = {employee} setEmployee = {setEmployee}/>
    <ToLunch employee = {employee} setEmployee = {setEmployee}/>
    <ReturnLunch employee = {employee} setEmployee = {setEmployee}/>
    </div>
  );
};

export default TimePunchPage;