import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const RequestPTO = (props) => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, postPTORequest);
    const {employeeID} = useParams();
    const [thisEmployee, setThisEmployee] = useState({});
    const defaultValues = {
        timetouse: 0,
      };
    console.log(state)

    async function postPTORequest(){
        try {
            let response = await axios.post(`http://127.0.0.1:8000/timeoff/request/${state.employee_id}`, formData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            navigate("/");
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
                Date:{" "}
                <input type="date" name="workDate" value={formData.workDate} onChange={handleInputChange}/>
            </label>
            <label>
                Sick Hours:{" "}
                <input type="number" name="requestedSickTime" value={formData.timetouse} onChange={handleInputChange}/>
            </label>
            <label>
                Vacation Hours:{" "}
                <input type="number" name="requestedVacationTime" value={formData.timetouse} onChange={handleInputChange}/>
            </label>
            <button className='add-employee-btn'>Submit Request</button>
        </form>
    </div>
    );
}

export default RequestPTO