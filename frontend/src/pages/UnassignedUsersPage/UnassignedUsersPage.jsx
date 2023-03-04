import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";

function UnassignedUsers(){
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [unassignedUsers, setUnassignedUsers] = useState([]);

  useEffect(() => {
    getUnassignedUsers();
  }, [token]);

  async function getUnassignedUsers(){
    const response = await axios.get("http://127.0.0.1:8000/employers/non_assigned/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setUnassignedUsers(employeesOnly(response.data));
  }
    // console.log(unassignedUsers)

    function employeesOnly(users) {
      return users.filter(user => user.is_staff === false);}

    const handleClick = (unassignedUser) => {
      navigate(`/add-employee/${unassignedUser.id}`, {
        state: {
          user_id: unassignedUser.id,
          firstName: unassignedUser.first_name,
          lastName: unassignedUser.last_name,
        }
      });
    };

    return (
      <div className="container">
        <Link to="/"><button className="home-btn">Home</button></Link>
        <table className='prop-tabel'>
          <thead>
            <tr className='table-col'>
              <th className='table-col'>User ID</th>
              <th className='table-col'>First Name</th>
              <th className='table-col'>Last Name</th>
              <th className='table-col'>Username</th>
              <th className='table-col'>Email</th>
              <th className='table-col'>Admin User</th>
            </tr>
          </thead>
          <tbody>
            {unassignedUsers.map((unassignedUser) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>{unassignedUser.id}</td>
                  <td className='table-row'>{unassignedUser.first_name}</td>
                  <td className='table-row'>{unassignedUser.last_name}</td>
                  <td className='table-row'>{unassignedUser.username}</td>
                  <td className='table-row'>{unassignedUser.email}</td>
                  <td className='table-row'>{unassignedUser.is_staff}</td>
                  <button className='employer-home-page-btns' onClick={() => handleClick(unassignedUser)}>Add Employee</button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

export default UnassignedUsers;