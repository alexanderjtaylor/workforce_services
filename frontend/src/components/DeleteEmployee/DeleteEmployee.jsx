import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const DeleteEmployee = (props) => {
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
            <button title="Delete employee" onClick={deleteEmployee} className="edit-delete-employee-btns">Delete</button>
        </td>
     );
}
 
export default DeleteEmployee;