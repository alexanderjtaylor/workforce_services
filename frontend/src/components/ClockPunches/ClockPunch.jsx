import axios from 'axios';
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const ClockPunch = (props) => {
    const [user, token] = useAuth();
    const [employee, setEmployee] = useState();
    const [timePunch, setTimePunch] = useState();
    const [shift, setShift] = useState();

    useEffect(() => {
        fetchEmployee();
      }, [token]);

      const fetchEmployee = async () => {
        try {
          let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setEmployee(response.data);
        } catch (error) {
          console.log(error.response.data);
        }
      };

      async function getShift(){
        const response = await axios.post(`http://127.0.0.1:8000/shifts/selected-shift/${shift.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setShift(response.data)

    return ( 
        <td>
            
        </td>
     )};

    async function punchIn(){
        const response = await axios.post(`http://127.0.0.1:8000/clock-in/create-time-punch/${employee.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setTimePunch(response.data)

    return ( 
        <td>
            
        </td>
     )};

async function nextPunch(){
    const response = await axios.post(`http://127.0.0.1:8000/clock-in/time-punch/${shift.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data)
    setTimePunch(response.data)

return ( 
    <td>
       
    </td>
 )};
}
 
export default ClockPunch;