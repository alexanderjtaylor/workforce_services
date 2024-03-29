import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const ApprovePTOPage = () => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const [employer, setEmployer] = useState({});
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, ApprovePTO);
    const [ptoRequest, setPTORequest] = useState({});
    let Approved = "Approved"
    // let employee_user_id = 0
    // let employee_employer_id = 0
    console.log(state.employee_id)

    useEffect(() => {
        fetchPTORequest();
        fetchEmployer();
      }, [token]);

    async function fetchPTORequest(){
        const response = await axios.get(`http://127.0.0.1:8000/paidtimeoff/${state.thisRequest_id}/pto-request`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setPTORequest(response.data)}

        async function fetchEmployer(){
            const response = await axios.get(`http://127.0.0.1:8000/employers/${user.id}`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            console.log(response.data.employer.id)
            setEmployer(response.data.employer.id)}

    async function ApprovePTO(){
        formData["status"] = Approved
        formData["ptoRequestStatus"] = Approved
        formData["employer_id"] = employer
        try {
            let response = await axios.patch(`http://127.0.0.1:8000/paidtimeoff/${state.thisRequest_id}/pto-update`, formData, {
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
                PTO Request ID:{" "}
                <input type="text" name="thisRequest_id" value={state.thisRequest_id} onChange={handleInputChange} readOnly={state.thisRequest_id}/>
            </label>
            <label>
                Employee ID:{" "}
                <input type="text" name="employee_id" value={state.employee_id} onChange={handleInputChange} readOnly={state.employee_id}/>
            </label>
            <label>
                Employer ID:{" "}
                <input type="text" name="employer" value={employer} onChange={handleInputChange} readOnly={state.employer}/>
            </label>
            <label>
                Start Work Date:{" "}
                <input type="text" name="startWorkDate" value={state.startWorkDate} onChange={handleInputChange} readOnly={state.startWorkDate}/>
            </label>
            <label>
                End Work Date:{" "}
                <input type="text" name="endWorkDate" value={state.endWorkDate} onChange={handleInputChange} readOnly={state.endWorkDate}/>
            </label>
            <label>
                Requested Sick Time:{" "}
                <input type="text" name="requestedSickTime" value={state.requestedSickTime} onChange={handleInputChange} readOnly={state.requestedSickTime}/>
            </label>
            <label>
                Requested Vacation Time:{" "}
                <input type="text" name="requestedVacationTime" value={state.requestedVacationTime} onChange={handleInputChange} readOnly={state.requestedVacationTime}/>
            </label>
            <label>
                Request Status:{" "}
                <input type="text" name="status" value={Approved} onChange={handleInputChange} readOnly={state.Approved}/>
            </label>
            <button className='edit-delete-employee-btns'>Approve</button>
        </form>
    </div>
    );
}

export default ApprovePTOPage