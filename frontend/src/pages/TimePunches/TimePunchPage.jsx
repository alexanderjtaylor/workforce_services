import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DateTime from "../../components/Clock/Clock";

const TimePunchPage = () => {
  const [user, token] = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const moment = require('moment');
  let now = ""
  const [employee, setEmployee] = useState([]);
  const [punch, setPunch] = useState([]);
  const [shift, setShift] = useState([]);
  const findDate = new Date();
  const year  = findDate.getFullYear();
  const month = (findDate.getMonth() + 1).toString().padStart(2, "0");
  const day   = findDate.getDate().toString().padStart(2, "0");
  const date = `${year}-${month}-${day}`;

  useEffect(() => {
    fetchPunch();
    fetchShift();
  }, [token]);

  const fetchPunch = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/clock-in/${state.employee_id}/punches`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setPunch(todaysPunch(response.data));
      console.log(todaysPunch(response.data))
    } catch (error) {
      console.log(error)
    }
  };

  const fetchShift = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/shifts/${state.employee_id}/shifts`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setShift(todaysShift(response.data))
      console.log(todaysShift(response.data))
    } catch (error) {
      console.log(error)
    }
  };


  function todaysPunch(array){
    let foundPunch = array.filter(function(punch){
      if(punch.shift.workDate.includes(date)){
        return true;
      }
    });
    return foundPunch[0];
  }

  function todaysShift(array){
    let foundShift = array.filter(function(shift){
      if(shift.workDate.includes(date)){
        return true;
      }
    });
    return foundShift[0];
  }
  // console.log(todaysShift(response.data))


  now = moment().format("MM/DD/YYYY HH:mm:ss")

  const handleClickone = (shift) => {
    navigate(`/clock-in/${shift.id}`, {
      state: {
        shift_id: shift.id,
        employee_id: shift.employee.id
      }
    });
  };

  const handleClicktwo = (punch) => {
    navigate(`/clock-out/${punch.id}`, {
      state: {
        punch_id: punch.id,
        shift_id: punch.shift.id,
        employee_id: punch.employee.id,
        clockIn: punch.clockIn
      }
    });
  };

  const handleClickthree = (punch) => {
    navigate(`/clock-go-to-lunch/${punch.id}`, {
      state: {
        punch_id: punch.id,
        shift_id: punch.shift.id,
        employee_id: punch.employee.id,
        clockIn: punch.clockIn
      }
    });
  };

  const handleClickfour = (punch) => {
    navigate(`/clock-return-lunch/${punch.id}`, {
      state: {
        punch_id: punch.id,
        shift_id: punch.shift.id,
        employee_id: punch.employee.id,
        clockIn: punch.clockIn
      }
    });
  };

  return (
    <div className="time-punch-container">
    <Link to="/"><button className="back-btn">Back</button></Link>
    <></>
    <DateTime/>
    <div className="time-punch-btns-div">
    <button className='time-punch-btns' onClick={() => handleClickone(shift)}>Clock In</button>
    <button className='time-punch-btns' onClick={() => handleClicktwo(punch)}>Clock Out</button>
    <button className='time-punch-btns' onClick={() => handleClickthree(punch)}>Go to Lunch</button>
    <button className='time-punch-btns' onClick={() => handleClickfour(punch)}>Return Lunch</button>
    </div>
    </div>
  );
};

export default TimePunchPage;