import React from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const EditEmployeePage = (props) => {
    let InitialValues = {
        employer_id: `${props.employerID}`,
        // user_id: `${props.employeeID}`,
        firstName: `${props.employeeFirstName}`,
        lastName: `${props.employeeLastName}`,
        dob: `${props.employeeDOB}`,
        address: `${props.employeeAddress}`,
        phoneNumber: `${props.employeePhoneNumber}`,
        jobTitle: `${props.employeeJobTitle}`,
        yearsWithCompany: `${props.employeeYearsWithCompany}`,
        sickTime: `${props.employeeSickTime}`,
        vacationTime: `${props.employeeVacationTime}`,
    };
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(InitialValues, postNewEmployee);


    async function postNewEmployee(){
        try {
            let response = await axios.put(`http://127.0.0.1:8000/employees/edit/${props.employeeID}`, formData, {
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
                <input type="text" name="employer_id" value={formData.employer_id} onChange={handleInputChange}/>
            </label>
            {/* <label>
                Employee User ID:{" "}
                <input type="text" name="user_id" value={formData.user_id} onChange={handleInputChange}/>
            </label> */}
            <label>
                First Name:{" "}
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}/>
            </label>
            <label>
                Last Name:{" "}
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}/>
            </label>
            <label>
                Date of Birth{" "}
                <input type="text" name="dob" value={formData.dob} onChange={handleInputChange}/>
            </label>
            <label>
                Address:{" "}
                <input type="text" name="address" value={formData.address} onChange={handleInputChange}/>
            </label>
            <label>
                Phone Number:{" "}
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}/>
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
                Sick Time:{" "}
                <input type="text" name="sickTime" value={formData.sickTime} onChange={handleInputChange}/>
            </label>
            <label>
                Vacation Time:{" "}
                <input type="text" name="vacationTime" value={formData.vacationTime} onChange={handleInputChange}/>
            </label>
            <button className='edit-employee-btn'>Edit Employee</button>
        </form>
    </div>
    );
}

export default EditEmployeePage