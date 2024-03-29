import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const ApprovePTOUpdateEmployee = () => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, UpdateEmployee);
    const [employee_user_id, setEmployee_user_id] = useState({});
    const [employee_employer_id, setEmployee_employer_id] = useState({});
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
        console.log(response.data.user.id)
        console.log(response.data.employer.id)
        setEmployee_user_id(response.data.user.id)
        setEmployee_employer_id(response.data.employer.id)
        setEmployee(response.data)}

    async function UpdateEmployee(){
        formData["user_id"] = employee_user_id
        formData["employer_id"] = employee_employer_id
        formData["sickTime"] = Math.floor(state.sickTime - state.requestedSickTime)
        formData["vacationTime"] = Math.floor(state.vacationTime - state.requestedVacationTime)
        // debugger
        try {
            let response = await axios.put(`http://127.0.0.1:8000/employees/edit/${state.employee_id}`, formData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            navigate(`/view-pto-requests/${state.employee_id}`);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
    <div className="container">
        <Link to="/time-off"><button className="back-btn">Back</button></Link>
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Employer ID:{" "}
                <input type="text" name="employer_id" value={employee_employer_id} onChange={handleInputChange} readOnly={employee_employer_id}/>
            </label>
            <label>
                Employee User ID:{" "}
                <input type="text" name="user_id" value={employee_user_id} onChange={handleInputChange} readOnly={employee_user_id}/>
            </label>
            <label>
                First Name:{" "}
                <input type="text" name="firstName" value={state.firstName} onChange={handleInputChange} readOnly={state.firstName}/>
            </label>
            <label>
                Last Name:{" "}
                <input type="text" name="lastName" value={state.lastName} onChange={handleInputChange} readOnly={state.lastName}/>
            </label>
            <label>
                Job Title:{" "}
                <input type="text" name="jobTitle" value={state.jobTitle} onChange={handleInputChange} readOnly={state.jobTitle}/>
            </label>
            <label>
                Years with Company:{" "}
                <input type="text" name="yearsWithCompany" value={state.yearsWithCompany} onChange={handleInputChange} readOnly={state.yearsWithCompany}/>
            </label>
            <label>
                Pay Rate:{" "}
                <input type="text" name="payRate" value={state.payRate} onChange={handleInputChange} readOnly={state.payRate}/>
            </label>
            <label>
                OT Pay Rate:{" "}
                <input type="text" name="OTPayRate" value={state.OTPayRate} onChange={handleInputChange} readOnly={state.OTPayRate}/>
            </label>
            <label>
                Sick Time:{" "}
                <input type="text" name="sickTime" value={state.sickTime - state.requestedSickTime} onChange={handleInputChange} readOnly={state.sickTime - state.requestedSickTime}/>
            </label>
            <label>
                Vacation Time:{" "}
                <input type="text" name="vacationTime" value={state.vacationTime - state.requestedVacationTime} onChange={handleInputChange} readOnly={state.vacationTime - state.requestedVacationTime}/>
            </label>
            <button className='edit-delete-employee-btns'>Update</button>
        </form>
    </div>
    );
}

export default ApprovePTOUpdateEmployee