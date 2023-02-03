import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const DeleteShift = (props) => {
    const [user, token] = useAuth();

    async function deleteShift(){
        const response = await axios.delete(`http://127.0.0.1:8000/shifts/edit/${props.employeeShifts.shift_id}`, {
        headers: {
            Authorization: "Bearer " + token,
          },});
        console.log(response.data)
        props.fetchEmployeeShifts()}

    return ( 
        <td>
            <button onClick={deleteShift} className='delete-btn'>Delete</button>
        </td>
     );
}
 
export default DeleteShift;