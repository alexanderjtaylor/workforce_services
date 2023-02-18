import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import DeleteShift from "../../components/DeleteShift/DeleteShift";

const AddSchedulePage = (props) => {
    const [user, token] = useAuth();
    const [employeeShifts, setEmployeeShifts] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, postNewShift);
    const {employeeID} = useParams();
    const [thisEmployee, setThisEmployee] = useState({});
    console.log(state)

  async function postNewShift(){
    try {
        let response = await axios.post(`http://127.0.0.1:8000/shifts/set/${state.employee_id}`, formData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        navigate("/schedule");
    } catch (error) {
        console.log(error.message);
    }
}

  return (
    <div className="container">
        <p className="note">Please Note: If holiday enter "1". If NOT holiday enter "0".</p>
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Employee ID:{" "}
                <input type="text" name="employee_id" value={formData.employee_id} onChange={handleInputChange}/>
            </label>
            <label>
                Work Date:{" "}
                <input type="date" name="workDate" value={formData.workDate} onChange={handleInputChange}/>
            </label>
            <label>
                Scheduled Start:{" "}
                <input type="text" name="scheduledStart" value={formData.scheduledStart} onChange={handleInputChange}/>
            </label>
            <label>
                Scheduled End:{" "}
                <input type="text" name="scheduledEnd" value={formData.scheduledEnd} onChange={handleInputChange}/>
            </label>
            <label>
                Holiday:{" "}
                <input type="text" name="isHoliday" value={formData.isHoliday} onChange={handleInputChange}/>
            </label>
            <button className='employer-home-page-btns'>Add Shift</button>
        </form>
    </div>
    );
}

export default AddSchedulePage;