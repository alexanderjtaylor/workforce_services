import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import DateTime from '../../components/Clock/Clock';
import {useNavigate} from "react-router-dom"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const GoToLunch = (props) => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [employee, setEmployee] = useState();
    const [timePunch, setTimePunch] = useState();
    const [shift, setShift] = useState();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, punchToLunch);

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
        console.log(response.data)
        setEmployee(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    async function punchToLunch(){
        const response = await axios.put(`http://127.0.0.1:8000/clock-in/time-punch/${state.shift.id}`, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        navigate("/");
        console.log(response.data)
        setTimePunch(response.data)};

    return ( 
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Employee ID:{" "}
                <input type="text" name="employee_id" value={formData.employee.id} onChange={handleInputChange}/>
            </label>
            <label>
                Shift ID:{" "}
                <input type="text" name="shift_id" value={formData.shift_id} onChange={handleInputChange}/>
            </label>
            <label>
                Time:{" "}
                <input type="text" name="ClockIn" value={formData.DateTime} onChange={handleInputChange}/>
            </label>
            <button className='edit-employee-btn'>Go to Lunch</button>
        </form>
    </div>
     )
}
 
export default GoToLunch;