import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import DateTime from '../../components/Clock/Clock';
import {useNavigate} from "react-router-dom"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const ReturnLunch = () => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [employee, setEmployee] = useState();
    const [timePunch, setTimePunch] = useState();
    const [shift, setShift] = useState();
    const [theTime, setTheTime] = useState();
    let time = ""
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, punchReturnLunch);
    var [date, setDate] = useState(new Date());
    // let tempDate = new Date();
    let theDate = date.getFullYear() + '-' + (date.getMonth()+1).toString().padStart(2, "0") + '-' + date.getDate().toString().padStart(2, "0") +' '+ date.getHours().toString().padStart(2, "0")+':'+ date.getMinutes().toString().padStart(2, "0")+':'+ date.getSeconds().toString().padStart(2, "0"); 
    
    useEffect(() => {
        let timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }   
    });
    console.log(theDate)

    async function punchReturnLunch(){
        formData["returnLunch"] = theDate
        const response = await axios.patch(`http://127.0.0.1:8000/clock-in/clock-punch/${state.punch_id}`, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        navigate("/");
        console.log(response.data)
        setTimePunch(response.data)};

    return ( 
      <div className="container">
        <Link to="/"><button className="home-btn">Home</button></Link>
        <form className="form" onSubmit={handleSubmit}>
        <label className='punch-form-input'>
                Employee ID:{" "}
                <input className='punch-form-input-boxes' type="text" name="employee_id" value={formData.employee_id} readOnly={formData.employee_id}/>
            </label>
            <label className='punch-form-input'>
                Shift ID:{" "}
                <input className='punch-form-input-boxes' type="text" name="shift_id" value={formData.shift_id} readOnly={formData.shift_id}/>
            </label>
            <label className='punch-form-input'>
                Clock In Time:{" "}
                <input className='punch-form-input-boxes' type="text" name="clockIn" value={formData.clockIn} readOnly={formData.clockIn}/>
            </label>
            <label className='punch-form-input'>
                Time:{" "}
                <input className='punch-form-input-boxes' type="text" name="returnLunch" value={theDate}  readOnly={theDate}/>
            </label>
            <button className='punch-btn'>Return Lunch</button>
        </form>
    </div>
     )
}
 
export default ReturnLunch;