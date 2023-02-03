import axios from 'axios';
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const GetEmployer = (props) => {
    const [user, token] = useAuth();
    const [employer, setEmployer] = useState([]);

    useEffect(() => {
        fetchEmployer();
      }, [token]);

    async function fetchEmployer(){
        const response = await axios.get(`http://127.0.0.1:8000/employers/${user.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setEmployer(response.data)}

    return ( 
        <td>
            {/* <h3>{props.employer.employer.companyName}</h3> */}
            {/* <h3>Employees: {props.employer.employee_count}</h3> */}
        </td>
     );
}
 
export default GetEmployer;