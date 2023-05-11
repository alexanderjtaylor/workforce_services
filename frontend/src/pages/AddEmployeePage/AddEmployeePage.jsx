import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const AddEmployeePage = (props) => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, postNewEmployee);
    const {employeeID} = useParams();
    const [thisEmployee, setThisEmployee] = useState({});
    const [employer, setEmployer] = useState({});
    console.log(state)

    useEffect(() => {
        fetchEmployer();
      }, [token]);

    async function fetchEmployer(){
        const response = await axios.get(`http://127.0.0.1:8000/employers/${user.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setEmployer(response.data.employer.id)}

    async function postNewEmployee(){
        formData["employer_id"] = employer
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
                <input type="text" name="employer_id" value={employer} onChange={handleInputChange} readOnly={employer}/>
            </label>
            <label>
                Employee User ID:{" "}
                <input type="text" name="user_id" value={formData.user_id} onChange={handleInputChange} readOnly={formData.user_id}/>
            </label>
            <label>
                First Name:{" "}
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} readOnly={formData.firstName}/>
            </label>
            <label>
                Last Name:{" "}
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} readOnly={formData.lastName}/>
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
            <button className='edit-delete-shift-btns'>Add Employee</button>
        </form>
    </div>
    );
}

export default AddEmployeePage