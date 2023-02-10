import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const CreatePayCheckPage = (props) => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, postNewPaycheck);
    const {employeeID} = useParams();
    const [thisEmployee, setThisEmployee] = useState({});
    console.log(state)

    async function postNewPaycheck(){
        try {
            let response = await axios.post("http://127.0.0.1:8000/paychecks/create-paycheck/", formData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            navigate("/paycheck-employer-home");
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
                Pay Rate:{" "}
                <input type="text" name="payRate" value={formData.payRate} onChange={handleInputChange}/>
            </label>
            <label>
                Overtime Rate:{" "}
                <input type="text" name="OTPayRate" value={formData.OTPayRate} onChange={handleInputChange}/>
            </label>
            <label>
                Base Pay Hours:{" "}
                <input type="text" name="hoursWorked" value={formData.hoursWorked} onChange={handleInputChange}/>
            </label>
            <label>
                Overtime Hours:{" "}
                <input type="text" name="OTHoursWorked" value={formData.OTHoursWorked} onChange={handleInputChange}/>
            </label>
            <label>
                Sick Time:{" "}
                <input type="text" name="sickTimeUsed" value={formData.sickTimeUsed} onChange={handleInputChange}/>
            </label>
            <label>
                Vacation Time:{" "}
                <input type="text" name="vacationTimeUsed" value={formData.vacationTimeUsed} onChange={handleInputChange}/>
            </label>
            <label>
                Taxes:{" "}
                <input type="text" name="taxes" value={formData.taxes} onChange={handleInputChange}/>
            </label>
            <button className='add-paycheck-btn'>Issue Paycheck</button>
        </form>
    </div>
    );
}
export default CreatePayCheckPage