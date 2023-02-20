import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const RequestVacationTime = (props) => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, postNewEmployee);
    const {employeeID} = useParams();
    const [thisEmployee, setThisEmployee] = useState({});
    const defaultValues = {
        timetouse: "",
      };
    console.log(state)

    async function postNewEmployee(){
        try {
            let response = await axios.post("http://127.0.0.1:8000/employees/create/", formData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            navigate("/search-employee");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
    <div className="container">
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Date:{" "}
                <input type="date" name="workDate" value={formData.workDate} onChange={handleInputChange}/>
            </label>
            <label>
                Vacation Time:{" "}
                <input type="text" name="vacationTime" value={formData.timetouse} onChange={handleInputChange}/>
            </label>
            <button className='add-employee-btn'>Request Time Off</button>
        </form>
    </div>
    );
}

export default RequestVacationTime