import React from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const CreatePayCheckPage = (props) => {

    let InitialValues = {
        employer_id: `${props.employeeEmployerID}`,
        user_id: `${props.employeeUserID}`,
        firstName: `${props.employeeFirstName}`,
        lastName: `${props.employeeLastName}`,
        payRate: `${props.employeePayRate}`,
        OTPayRate: `${props.employeeOTPayRate}`,
        jobTitle: `${props.employeeJobTitle}`,
        yearsWithCompany: `${props.employeeYearsWithCompany}`,
        sickTime: `${props.employeeSickTime}`,
        vacationTime: `${props.employeeVacationTime}`,
        hoursWorked: "",
        OTHoursWorked: "",
        sickTimeUsed: "",
        vacationTimeUsed: "",
        taxes: "",
        employee_id: `${props.employeeID}`,
    }

    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(InitialValues, postNewPaycheck);


    async function postNewPaycheck(){
        try {
            let response = await axios.post("http://127.0.0.1:8000/paychecks/create-paycheck/", formData, {
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