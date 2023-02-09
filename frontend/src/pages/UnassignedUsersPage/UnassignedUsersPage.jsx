import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    setUnassignedUsers(response.data);}

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
        <table className='prop-tabel'>
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin User</th>
            </tr>
          </thead>
          <tbody>
            {unassignedUsers.map((unassignedUser) => {
              return (
                <tr>
                  <td>{unassignedUser.id}</td>
                  <td>{unassignedUser.first_name}</td>
                  <td>{unassignedUser.last_name}</td>
                  <td>{unassignedUser.username}</td>
                  <td>{unassignedUser.email}</td>
                  <td>{unassignedUser.is_staff}</td>
                  <button onClick={() => handleClick(unassignedUser)}>Add Employee</button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

export default UnassignedUsers;