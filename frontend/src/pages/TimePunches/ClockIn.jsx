import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import DateTime from '../../components/Clock/Clock';
import {useNavigate} from "react-router-dom"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const ClockIn = (props) => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [employee, setEmployee] = useState();
    const [timePunch, setTimePunch] = useState();
    const [shift, setShift] = useState();
    const [theTime, setTheTime] = useState();
    let time = ""
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, punchIn);


    // const getDateTime = () => {
    //   let tempDate = new Date();
    //   let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(); 
    //   // const currDate = "Current Date= "+date;
    //   setTheTime(date)
    //   // this.setState({ reportStartDate: currDate})
    // }

    // const time = new Date().toLocaleTimeString()


    var [date, setDate] = useState(new Date());
    // let tempDate = new Date();
    let theDate = date.getFullYear() + '-' + (date.getMonth()+1).toString().padStart(2, "0") + '-' + date.getDate().toString().padStart(2, "0") +' '+ date.getHours().toString().padStart(2, "0")+':'+ date.getMinutes().toString().padStart(2, "0")+':'+ date.getSeconds().toString().padStart(2, "0"); 
    
    useEffect(() => {
        let timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }   
    });
    // time = date.toLocaleDateString() + date.toLocaleTimeString()
    console.log(theDate)
    // console.log(date.toLocaleDateString())
    // console.log(date.toLocaleTimeString())

    // useEffect(() => {
    //   getDateTime();
    //   // fetchEmployee();
    // }, [token]);
  
    // const fetchEmployee = async () => {
    //   try {
    //     let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}`, {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     });
    //     console.log(response.data.id)
    //     setEmployee(response.data.id);
    //   } catch (error) {
    //     console.log(error.response.data);
    //   }
    // };

    async function punchIn(){
        const response = await axios.post(`http://127.0.0.1:8000/clock-in/create-time-punch/${state.employee_id}`, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        navigate("/");
        console.log(response.data)
        setTimePunch(response.data)};

    return ( 
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Employee ID:{" "}
                <input type="text" name="employee_id" value={formData.employee_id} onChange={handleInputChange}/>
            </label>
            <label>
                Shift ID:{" "}
                <input type="text" name="shift_id" value={formData.shift_id} onChange={handleInputChange}/>
            </label>
            <label>
                Time:{" "}
                <input type="text" name="theDate" value={formData.theDate} onChange={handleInputChange}/>
            </label>
            <button className='add-employee-btn'>Clock In</button>
        </form>
    </div>
     )
}
 
export default ClockIn;