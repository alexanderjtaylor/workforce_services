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
        <Link to="/"><button className="back-btn">Back</button></Link>
        <table className='prop-tabel'>
          <thead>
            <tr className='table-col-center'>
              <th className='table-col-center'>User ID</th>
              <th className='table-col-center'>Name</th>
              <th className='table-col-center'>Username</th>
              <th className='table-col-center'>Email</th>
            </tr>
          </thead>
          <tbody>
            {unassignedUsers.map((unassignedUser) => {
              return (
                <tr className='table-row-center'>
                  <td className='table-row-center'>{unassignedUser.id}</td>
                  <td className='table-row-center'>{unassignedUser.first_name} {unassignedUser.last_name}</td>
                  <td className='table-row-center'>{unassignedUser.username}</td>
                  <td className='table-row-center'>{unassignedUser.email}</td>
                  <button className='employer-schedule-btns' onClick={() => handleClick(unassignedUser)}>Add Employee</button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

export default UnassignedUsers;