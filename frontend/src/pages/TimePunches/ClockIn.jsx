import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import DateTime from '../../components/Clock/Clock';
import {useNavigate} from "react-router-dom"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const ClockIn = (props) => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [employee, setEmployee] = useState();
    const [timePunch, setTimePunch] = useState();
    const [shift, setShift] = useState();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, punchIn);

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

    async function punchIn(){
        const response = await axios.post(`http://127.0.0.1:8000/clock-in/create-time-punch/${employee.id}`, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        navigate("/");
        console.log(response.data)
        setTimePunch(response.data)};

        // async function getShift(){
        //     const response = await axios.get(`http://127.0.0.1:8000/shifts/selected-shift/${state.shift.id}`, {
        //       headers: {
        //         Authorization: "Bearer " + token,
        //       },
        //     });
        //     console.log(response.data)
        //     setShift(response.data)};

    return ( 
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Employee ID:{" "}
                <input type="text" name="employee_id" value={formData.employee_id} onChange={handleInputChange}/>
            </label>
            <label>
                Shift ID:{" "}
                <input type="text" name="shift_id" value={formData.shift_id} onChange={handleInputChange}/>
            </label>
            <label>
                Time:{" "}
                <input type="text" name="ClockIn" value={formData.DateTime} onChange={handleInputChange}/>
            </label>
            <button className='add-employee-btn'>Clock In</button>
        </form>
    </div>
     )
}
 
export default ClockIn;