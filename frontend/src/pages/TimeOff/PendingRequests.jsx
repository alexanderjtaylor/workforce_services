import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const PendingPTORequests = (props) => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const [ptoRequests, setPTORequests] = useState([]);
    console.log(state)

    useEffect(() => {
        fetchPTORequests();
      }, [token]);

    async function fetchPTORequests(){
        const response = await axios.get(`http://127.0.0.1:8000/paidtimeoff/${state.employee_id}/pto-requests`, {
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
                    <th className='table-col'>Requested PTO Date(s)</th>
                    <th className='table-col'>Sick Hours</th>
                    <th className='table-col'>Vacation Hours</th>
                    <th className='table-col'>Request Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ptoRequests.map((thisRequest) => {
                    let s = new Date(thisRequest.startWorkDate);
                    let e = new Date(thisRequest.endWorkDate);
                    let startYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(s);
                    let startMonth = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(s);
                    let startDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(s);
                    let endYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(e);
                    let endMonth = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(e);
                    let endDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(e);
                    return (
                      <tr className='table-row'>
                        <td className='table-row'>{((`${startMonth}/${startDay}/${startYear}`))} - {((`${endMonth}/${endDay}/${endYear}`))}</td>
                        {/* <td className='table-row'>{thisRequest.startWorkDate} - {thisRequest.endWorkDate}</td> */}
                        <td className='table-row'>{thisRequest.requestedSickTime}</td>
                        <td className='table-row'>{thisRequest.requestedVacationTime}</td>
                        <td className='table-row'>{thisRequest.ptoRequestStatus}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
      };

export default PendingPTORequests