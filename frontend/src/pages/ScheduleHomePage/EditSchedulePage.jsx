import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import DeleteShift from "../../components/DeleteShift/DeleteShift";

const EditSchedulePage = () => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, editShift);
    console.log(state)

async function editShift(){
    try {
        let response = await axios.put(`http://127.0.0.1:8000/shifts/edit/${state.shift_id}`, formData, {
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
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Employee ID:{" "}
                <input type="text" name="employee_id" value={formData.employee_id} onChange={handleInputChange}/>
            </label>
            <label>
                Work Date:{" "}
                <input type="text" name="workDate" value={formData.workDate} onChange={handleInputChange}/>
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
                Actual Start:{" "}
                <input type="text" name="actualStart" value={formData.actualStart} onChange={handleInputChange}/>
            </label>
            <label>
                Actual End{" "}
                <input type="text" name="actualEnd" value={formData.actualEnd} onChange={handleInputChange}/>
            </label>
            <label>
                Sick Hours:{" "}
                <input type="text" name="sickTimeUsed" value={formData.sickTimeUsed} onChange={handleInputChange}/>
            </label>
            <label>
                Vacation Hours:{" "}
                <input type="text" name="vacationTimeUsed" value={formData.vacationTimeUsed} onChange={handleInputChange}/>
            </label>
            <label>
                Holiday:{" "}
                <input type="text" name="isHoliday" value={formData.isHoliday} onChange={handleInputChange}/>
            </label>
            <label>
                Clocked In:{" "}
                <input type="text" name="isClockedIn" value={formData.isClockedIn} onChange={handleInputChange}/>
            </label>
            <button className='employer-home-page-btns'>Edit Shift</button>
        </form>
    </div>
    );
}

export default EditSchedulePage;