import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import DateTime from "../../components/Clock/Clock";
import ClockIn from "../../components/ClockPunches/ClockIn";
import ClockOut from "../../components/ClockPunches/ClockOut";
import ToLunch from "../../components/ClockPunches/ToLunch";
import ReturnLunch from "../../components/ClockPunches/ReturnLunch";
import GetEmployeeShifts from "../../components/GetEmployeeShifts/GetEmployeeShifts";

const ClockInPage = () => {
  const [user, token] = useAuth();
  const [employee, setEmployee] = useState([]);
  const [shift, setShift] = useState([]);

  useEffect(() => {
    fetchEmployee();
  }, [token]);

  const fetchEmployee = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setEmployee(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchShift = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/shifts/selected-shift/${shift.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setShift(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
    <Link to="/"><button>Home</button></Link>
      <h1>Welcome {employee.firstName}</h1>
    <DateTime/>
    <h3>Status</h3>
    <p>{shift.isClockedIn}</p>
    <ClockIn employee = {employee} setEmployee = {setEmployee}/>
    <ClockOut employee = {employee} setEmployee = {setEmployee}/>
    <ToLunch employee = {employee} setEmployee = {setEmployee}/>
    <ReturnLunch employee = {employee} setEmployee = {setEmployee}/>
    </div>
  );
};

export default ClockInPage;