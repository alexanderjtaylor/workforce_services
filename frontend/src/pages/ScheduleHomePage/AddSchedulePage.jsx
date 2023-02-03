import React from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const AddSchedulePage = (props) => {

    let InitialValues = {
        shift_id: "",
        employee_id: `${props.employeeID}`,
        workDate: "",
        scheduledStart: "",
        scheduledEnd: "",
        actualStart: "",
        actualEnd: "",
        isHoliday: "",
        isClockedIn: "",
      };

  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(InitialValues, postNewShift);
  // const [employeeShifts, setEmployeeShifts] = useState([]);
  // const [employees, setEmployees] = useState([]);
  // const [employer, setEmployer] = useState([]);

  async function postNewShift(){
    try {
        let response = await axios.post(`http://127.0.0.1:8000/shifts/set/${props.employeeID}`, formData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        navigate("/view-schedule");
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
                Work Date:{" "}
                <input type="text" name="workDate" value={formData.workDate} onChange={handleInputChange}/>
            </label>
            <label>
                Scheduled Start:{" "}
                <input type="text" name="scheduledStart" value={formData.scheduledStart} onChange={handleInputChange}/>
            </label>
            <label>
                Scheduled End:{" "}
                <input type="text" name="scheduledEnd" value={formData.scheduledEnd} onChange={handleInputChange}/>
            </label>
            <label>
                Actual Start:{" "}
                <input type="text" name="actualStart" value={formData.actualStart} onChange={handleInputChange}/>
            </label>
            <label>
                Actual End{" "}
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
            <button className='add-shift-btn'>Add Shift</button>
        </form>
    </div>
    );
}

export default AddSchedulePage;