import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const ViewTimeOffRequests = (props) => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const [ptoRequests, setPTORequests] = useState([]);
    console.log(state)

    useEffect(() => {
        fetchPTORequests();
      }, [token]);

    async function fetchPTORequests(){
        const response = await axios.get(`http://127.0.0.1:8000/paidtimeoff/employer/${props.employer}/pto-requests`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setPTORequests(response.data);}
        
        return (
            <div className="container">
              <Link to="/"><button className="home-btn">Home</button></Link>
              <table className='profile-tabel'>
                <thead>
                  <tr className='table-col'>
                    <th className='table-col'>First Name</th>
                    <th className='table-col'>Last Name</th>
                    <th className='table-col'>Requested PTO Start Date</th>
                    <th className='table-col'>Requested PTO End Date</th>
                    <th className='table-col'>Sick Hours</th>
                    <th className='table-col'>Vacation Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {ptoRequests.map((thisRequest) => {
                    return (
                      <tr className='table-row'>
                        <td className='table-row'>{thisRequest.employee.firstName}</td>
                        <td className='table-row'>{thisRequest.employee.lastName}</td>
                        <td className='table-row'>{thisRequest.startWorkDate}</td>
                        <td className='table-row'>{thisRequest.endWorkDate}</td>
                        <td className='table-row'>{thisRequest.requestedSickTime}</td>
                        <td className='table-row'>{thisRequest.requestedVacationTime}</td>
                        <button className='home-page-btns' onClick={() => handleClick(employee)}>Approve</button>
                        <button className='home-page-btns' onClick={() => handleClick(employee)}>Deny</button>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
      };

export default ViewTimeOffRequests