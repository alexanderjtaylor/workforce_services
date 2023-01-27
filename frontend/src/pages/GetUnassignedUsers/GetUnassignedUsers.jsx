// import React from "react";
// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import SearchBar from "../../components/SearchBar/SearchBar";
// import Delete from "../../components/DeleteEmployee/DeleteEmployee";
// import EditEmployeePage from "../EditEmployeePage/EditEmployeePage";

// function UnassignedUsers(){
//   const [user, token] = useAuth();
//   const [employees, setEmployees] = useState([]);
//   const [unassignedUsers, setUnassignedUsers] = useState([]);

//   useEffect(() => {
//     getUnassignedUsers();
//   }, [token]);

//   async function getUnassignedUsers(){
//     const response = await axios.get("http://127.0.0.1:8000/employers/non_assigned/", {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     });
//     setUnassignedUsers(response.data);}

//     return (
//       <div className="container">
//         <table className='prop-tabel'>
//           <thead>
//             <tr>
//               <th>User ID</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Admin User</th>
//             </tr>
//           </thead>
//           <tbody>
//             {unassignedUsers.map((unassignedUser) => {
//               return (
//                 <tr>
//                   <td>{unassignedUser.id}</td>
//                   <td>{unassignedUser.first_name}</td>
//                   <td>{unassignedUser.last_name}</td>
//                   <td>{unassignedUser.username}</td>
//                   <td>{unassignedUser.email}</td>
//                   <td>{unassignedUser.is_staff}</td>
//                   <Link to={{pathname:"/edit-employee", state:{employee:true}}}><button>Edit Employee</button></Link>
//                   <Delete employeeID = {employee.id} fetchEmployees = {fetchEmployees}/>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <Link to="/add-employee"><button>Add Employee</button></Link>
//       </div>
//     );
// };

// export default UnassignedUsers;