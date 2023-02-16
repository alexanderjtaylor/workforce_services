import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DateTime from "../../components/Clock/Clock";
import ClockIn from "./ClockIn";
import ClockOut from "./ClockOut";
import ToLunch from "./ToLunch";
import ReturnLunch from "./ReturnLunch";
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

  const handleClickone = (shift) => {
    navigate(`/clock-in/${shift.id}`, {
      state: {
        shift_id: shift.id,
      }
    });
  };

  const handleClicktwo = (shift) => {
    navigate(`/clock-out/${shift.id}`, {
      state: {
        shift_id: shift.id,
      }
    });
  };

  const handleClickthree = (shift) => {
    navigate(`/clock-go-to-lunch/${shift.id}`, {
      state: {
        shift_id: shift.id,
      }
    });
  };

  const handleClickfour = (shift) => {
    navigate(`/clock-return-lunch/${shift.id}`, {
      state: {
        shift_id: shift.id,
      }
    });
  };

  return (
    <div className="container">
    <Link to="/"><button className="home-btn">Home</button></Link>

    <>
    {console.log(shift)}
    {shift.data ? (
      shift.data.map((shift) => {
        return (
          <tr className='table-row'>
            <td className='table-row'>{shift.id}</td>
            <td className='table-row'>{shift.workDate}</td>
          </tr>)})
          ) : (
            <h3>not working</h3>
          )}
    </>

    {/* <h3>{shift.data && shift.data.map((shift) => {
      return (
        <tr className='table-row'>
          <td className='table-row'>{shift.id}</td>
          <td className='table-row'>{shift.workDate}</td>
        </tr>
      );
    })}
    </h3> */}
    {/* <h3>Date: {shift.workDate}</h3> */}

    <DateTime/>
    <div className="time-punch-btns-div">
    <button className='home-page-btns' onClick={() => handleClickone(shift)}>Clock In</button>
    <button className='home-page-btns' onClick={() => handleClicktwo(shift)}>Clock Out</button>
    <button className='home-page-btns' onClick={() => handleClickthree(shift)}>Go to Lunch</button>
    <button className='home-page-btns' onClick={() => handleClickfour(shift)}>Return Lunch</button>
    {/* <ClockOut employee = {employee} setEmployee = {setEmployee}/>
    <ToLunch employee = {employee} setEmployee = {setEmployee}/>
    <ReturnLunch employee = {employee} setEmployee = {setEmployee}/> */}
    </div>
    </div>
  );
};

export default TimePunchPage;