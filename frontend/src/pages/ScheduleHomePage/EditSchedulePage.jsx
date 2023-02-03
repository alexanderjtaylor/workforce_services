import React from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"


const EditSchedulePage = (props) => {

    let InitialValues = {
        shift_id: `${props.shift_id}`,
        employee_id: `${props.employee_id}`,
        workDate: `${props.workDate}`,
        scheduledStart: `${props.scheduledStart}`,
        scheduledEnd: `${props.scheduledEnd}`,
        actualStart: `${props.actualStart}`,
        actualEnd: `${props.actualEnd}`,
        isHoliday: `${props.isHoliday}`,
        isClockedIn: `${props.isClockedIn}`,
      };

    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(InitialValues, editShift);


    async function editShift(){
        try {
            let response = await axios.put(`http://127.0.0.1:8000/shifts/edit/${props.shift_id}`, formData, {
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
                Shift ID:{" "}
                <input type="text" name="shift_id" value={formData.shift_id} onChange={handleInputChange}/>
            </label>
            <label>
                Employee ID:{" "}
                <input type="text" name="employee_id" value={formData.employee_id} onChange={handleInputChange}/>
            </label>
            <label>
                Work Date:{" "}
                <input type="text" name="workDate" value={formData.workDate} onChange={handleInputChange}/>
            </label>
            <label>
                Scheduled Start:{" "}
                <input type="text" name="scheduledStart" value={formData.scheduledStart} onChange={handleInputChange}/>
            </label>
            <label>
                Scheduled End{" "}
                <input type="text" name="scheduledEnd" value={formData.scheduledEnd} onChange={handleInputChange}/>
            </label>
            <label>
                Actual Start:{" "}
                <input type="text" name="actualStart" value={formData.actualStart} onChange={handleInputChange}/>
            </label>
            <label>
                Actual End:{" "}
                <input type="text" name="actualEnd" value={formData.actualEnd} onChange={handleInputChange}/>
            </label>
            <label>
                Holiday:{" "}
                <input type="text" name="isHoliday" value={formData.isHoliday} onChange={handleInputChange}/>
            </label>
            <label>
                Clocked In:{" "}
                <input type="text" name="isClockedIn" value={formData.isClockedIn} onChange={handleInputChange}/>
            </label>
            <button className='edit-shift-btn'>Edit Shift</button>
        </form>
    </div>
    );
}

export default EditSchedulePage;