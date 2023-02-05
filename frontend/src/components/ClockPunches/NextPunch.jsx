import axios from 'axios';
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const ClockIn = (props) => {
    const [user, token] = useAuth();
    const [employee, setEmployee] = useState();
    const [timePunch, setTimePunch] = useState();
    const [shift, setShift] = useState();

    async function nextPunch(){
        const response = await axios.post(`http://127.0.0.1:8000/clock-in/time-punch/${shift.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setTimePunch(response.data)};

    return ( 
        <td>
           <punchIn />
           <nextPunch/>
        </td>
     )
}
 
export default ClockIn;
