import axios from 'axios';

const Delete = (props) => {

    async function deleteEmployee(){
        const response = await axios.delete(`http://127.0.0.1:8000/employees/edit/${props.employeeID}`)
        console.log(response.data)
        props.fetchEmployees()
    }

    return ( 
        <td>
            <button onClick={deleteEmployee} className='delete-btn'>Delete</button>
        </td>
     );
}
 
export default Delete;