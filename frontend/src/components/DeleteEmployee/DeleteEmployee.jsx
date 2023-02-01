import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const Delete = (props) => {
    const [user, token] = useAuth();

    async function deleteEmployee(){
        const response = await axios.delete(`http://127.0.0.1:8000/employees/edit/${props.employeeID}`, {
        headers: {
            Authorization: "Bearer " + token,
          },});
        console.log(response.data)
        props.fetchEmployees()}

    return ( 
        <td>
            <button onClick={deleteEmployee} className='delete-btn'>Delete</button>
        </td>
     );
}
 
export default Delete;