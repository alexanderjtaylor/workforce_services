import axios from 'axios';
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import DateTime from '../Clock/Clock';

const ClockIn = (props) => {
    const [user, token] = useAuth();
    const [timePunch, setTimePunch] = useState();
    const [shift, setShift] = useState();

    async function punchIn(){
        const response = await axios.post(`http://127.0.0.1:8000/clock-in/create-time-punch/${props.employee.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setTimePunch(response.data)};

        async function getShift(){
            const response = await axios.get(`http://127.0.0.1:8000/shifts/selected-shift/${shift.id}`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            console.log(response.data)
            setShift(response.data)};

    return ( 
        <td>
            {/* <h1>{props.employee.id}</h1> */}
           <button>Clock In</button>
        </td>
     )
}
 
export default ClockIn;