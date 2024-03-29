import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const EditEmployeePage = () => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, EditEmployee);
    const {employeeID} = useParams();
    const [thisEmployee, setThisEmployee] = useState({});
    console.log(state)

    async function EditEmployee(){
        try {
            let response = await axios.put(`http://127.0.0.1:8000/employees/edit/${state.employee_id}`, formData, {
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
        <Link to="/search-employee"><button className="back-btn">Back</button></Link>
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Employer ID:{" "}
                <input type="text" name="employer_id" value={formData.employer_id} onChange={handleInputChange} readOnly={formData.employer_id}/>
            </label>
            <label>
                Employee User ID:{" "}
                <input type="text" name="user_id" value={formData.user_id} onChange={handleInputChange} readOnly={formData.user_id}/>
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
                Job Title:{" "}
                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange}/>
            </label>
            <label>
                Years with Company:{" "}
                <input type="text" name="yearsWithCompany" value={formData.yearsWithCompany} onChange={handleInputChange}/>
            </label>
            <label>
                Pay Rate:{" "}
                <input type="text" name="payRate" value={formData.payRate} onChange={handleInputChange}/>
            </label>
            <label>
                OT Pay Rate:{" "}
                <input type="text" name="OTPayRate" value={formData.OTPayRate} onChange={handleInputChange}/>
            </label>
            <label>
                Sick Time:{" "}
                <input type="text" name="sickTime" value={formData.sickTime} onChange={handleInputChange}/>
            </label>
            <label>
                Vacation Time:{" "}
                <input type="text" name="vacationTime" value={formData.vacationTime} onChange={handleInputChange}/>
            </label>
            <button className='edit-delete-employee-btns'>Edit</button>
        </form>
    </div>
    );
}

export default EditEmployeePage