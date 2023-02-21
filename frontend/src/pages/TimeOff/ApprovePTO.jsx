import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const ApprovePTOPage = () => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, ApprovePTO);
    const {employeeID} = useParams();
    const [thisEmployee, setThisEmployee] = useState({});
    console.log(state)
    console.log(state.employee_id)

    useEffect(() => {
        fetchEmployee();
      }, [token]);

    async function fetchEmployee(){
        const response = await axios.get(`http://127.0.0.1:8000/employees/employee/${state.employee_id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setEmployee(response.data)}

    async function ApprovePTO(){
        try {
            let response = await axios.put(`http://127.0.0.1:8000/employees/edit/${state.employee_id}`, formData, {
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
                Employer ID:{" "}
                <input type="text" name="employer_id" value={state.employer_id} onChange={handleInputChange}/>
            </label>
            <label>
                Employee User ID:{" "}
                <input type="text" name="user_id" value={state.user_id} onChange={handleInputChange}/>
            </label>
            <label>
                First Name:{" "}
                <input type="text" name="firstName" value={state.firstName} onChange={handleInputChange}/>
            </label>
            <label>
                Last Name:{" "}
                <input type="text" name="lastName" value={state.lastName} onChange={handleInputChange}/>
            </label>
            <label>
                Job Title:{" "}
                <input type="text" name="jobTitle" value={state.jobTitle} onChange={handleInputChange}/>
            </label>
            <label>
                Years with Company:{" "}
                <input type="text" name="yearsWithCompany" value={state.yearsWithCompany} onChange={handleInputChange}/>
            </label>
            <label>
                Pay Rate:{" "}
                <input type="text" name="payRate" value={state.payRate} onChange={handleInputChange}/>
            </label>
            <label>
                OT Pay Rate:{" "}
                <input type="text" name="OTPayRate" value={state.OTPayRate} onChange={handleInputChange}/>
            </label>
            <label>
                Sick Time:{" "}
                <input type="text" name="sickTime" value={state.sickTime - state.requestedSickTime} onChange={handleInputChange}/>
            </label>
            <label>
                Vacation Time:{" "}
                <input type="text" name="vacationTime" value={state.vacationTime - state.requestedVacationTime} onChange={handleInputChange}/>
            </label>
            <button className='edit-employee-btn'>Approve Request</button>
        </form>
    </div>
    );
}

export default ApprovePTOPage