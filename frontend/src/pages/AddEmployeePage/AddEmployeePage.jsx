import React from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const AddEmployeePage = (props) => {

    let InitialValues = {
        employer_id: "",
        user_id: "",
        firstName: `${props.unassignedUserFirstName}`,
        lastName: `${props.unassignedUserLastName}`,
        payRate: "",
        OTPayRate: "",
        jobTitle: "",
        yearsWithCompany: "",
        sickTime: "",
        vacationTime: "",
    };

    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(InitialValues, postNewEmployee);


    async function postNewEmployee(){
        try {
            let response = await axios.post("http://127.0.0.1:8000/employees/create/", formData, {
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
            <button className='add-employee-btn'>Add Employee</button>
        </form>
    </div>
    );
}

export default AddEmployeePage