import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const RequestSickTime = (props) => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, postNewEmployee);
    const {employeeID} = useParams();
    const [thisEmployee, setThisEmployee] = useState({});
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
                Employer ID:{" "}
                <input type="text" name="employer_id" value={formData.employer_id} onChange={handleInputChange}/>
            </label>
            <label>
                Employee User ID:{" "}
                <input type="text" name="user_id" value={formData.user_id} onChange={handleInputChange}/>
            </label>
            <label>
                First Name:{" "}
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}/>
            </label>
            <label>
                Last Name:{" "}
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}/>
            </label>
            <label>
                Pay Rate:{" "}
                <input type="text" name="payRate" value={formData.payRate} onChange={handleInputChange}/>
            </label>
            <label>
                Sick Time:{" "}
                <input type="text" name="sickTime" value={formData.sickTime} onChange={handleInputChange}/>
            </label>
            <button className='add-employee-btn'>Add Employee</button>
        </form>
    </div>
    );
}

export default RequestSickTime