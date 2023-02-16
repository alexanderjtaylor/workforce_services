import axios from 'axios';
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const GetEmployee = () => {
    const [user, token] = useAuth();
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        fetchEmployee();
      }, [token]);

    async function fetchEmployee(){
        const response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setEmployee(response.data.id)}

    return ( 
        <td>
            {/* <h3>{props.employer.employer.companyName}</h3>
            <h3>Employees: {props.employer.employee_count}</h3> */}
        </td>
     );
}
 
export default GetEmployee;