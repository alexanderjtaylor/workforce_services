import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const ViewTimeOffRequests = (props) => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const moment = require('moment');
    const [ptoRequests, setPTORequests] = useState([]);
    console.log(state)

    useEffect(() => {
        fetchPTORequests();
      }, [token]);

    async function fetchPTORequests(){
        const response = await axios.get(`http://127.0.0.1:8000/paidtimeoff/employer/${user.id}/pto-requests`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data)
        setPTORequests(response.data);}

        const handleClickone = (thisRequest) => {
          navigate(`/approve-pto/${thisRequest.id}`, {
            state: {
              thisRequest_id: thisRequest.id,
              requestedSickTime: thisRequest.requestedSickTime,
              requestedVacationTime: thisRequest.requestedVacationTime,
              employee_id: thisRequest.employee.id,
              employer_id: thisRequest.employee.employer.id,
              user_id: thisRequest.employee.user.id,
              firstName: thisRequest.employee.firstName,
              lastName: thisRequest.employee.lastName,
              jobTitle: thisRequest.employee.jobTitle,
              yearsWithCompany: thisRequest.employee.yearsWithCompany,
              payRate: thisRequest.employee.payRate,
              OTPayRate: thisRequest.employee.OTPayRate,
              sickTime: thisRequest.employee.sickTime,
              vacationTime: thisRequest.employee.vacationTime,
              ptoRequestStatus: thisRequest.ptoRequestStatus,
              startWorkDate: thisRequest.startWorkDate,
              endWorkDate: thisRequest.endWorkDate,
            }
          });
        };

        const handleClicktwo = (thisRequest) => {
          navigate(`/deny-pto/${thisRequest.id}`, {
            state: {
              thisRequest_id: thisRequest.id,
              requestedSickTime: thisRequest.requestedSickTime,
              requestedVacationTime: thisRequest.requestedVacationTime,
              employee_id: thisRequest.employee.id,
              employer_id: thisRequest.employee.employer.id,
              user_id: thisRequest.employee.user.id,
              firstName: thisRequest.employee.firstName,
              lastName: thisRequest.employee.lastName,
              jobTitle: thisRequest.employee.jobTitle,
              yearsWithCompany: thisRequest.employee.yearsWithCompany,
              payRate: thisRequest.employee.payRate,
              OTPayRate: thisRequest.employee.OTPayRate,
              sickTime: thisRequest.employee.sickTime,
              vacationTime: thisRequest.employee.vacationTime,
              ptoRequestStatus: thisRequest.ptoRequestStatus,
              startWorkDate: thisRequest.startWorkDate,
              endWorkDate: thisRequest.endWorkDate,
            }
          });
        };

        const handleClickthree = (thisRequest) => {
          navigate(`/pto-update-employee/${thisRequest.id}`, {
            state: {
              thisRequest_id: thisRequest.id,
              requestedSickTime: thisRequest.requestedSickTime,
              requestedVacationTime: thisRequest.requestedVacationTime,
              employee_id: thisRequest.employee.id,
              employer_id: thisRequest.employee.employer.id,
              user_id: thisRequest.employee.user.id,
              firstName: thisRequest.employee.firstName,
              lastName: thisRequest.employee.lastName,
              jobTitle: thisRequest.employee.jobTitle,
              yearsWithCompany: thisRequest.employee.yearsWithCompany,
              payRate: thisRequest.employee.payRate,
              OTPayRate: thisRequest.employee.OTPayRate,
              sickTime: thisRequest.employee.sickTime,
              vacationTime: thisRequest.employee.vacationTime,
              ptoRequestStatus: thisRequest.ptoRequestStatus,
              startWorkDate: thisRequest.startWorkDate,
              endWorkDate: thisRequest.endWorkDate,
            }
          });
        };
        
        return (
            <div className="container">
              <Link to="/"><button className="home-btn">Home</button></Link>
              <table className='profile-tabel'>
                <thead>
                  <tr className='table-col'>
                    <th className='table-col'>First Name</th>
                    <th className='table-col'>Last Name</th>
                    <th className='table-col'>Requested PTO Date(s)</th>
                    <th className='table-col'>Sick Hours</th>
                    <th className='table-col'>Vacation Hours</th>
                    <th className='table-col'>Request Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ptoRequests.map((thisRequest) => {
                    console.log(thisRequest.startWorkDate)
                    console.log(thisRequest)
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
                        <td className='table-row'>{thisRequest.employee.firstName}</td>
                        <td className='table-row'>{thisRequest.employee.lastName}</td>
                        <td className='table-row'>{moment(thisRequest.startWorkDate).format("MM/DD/YYYY")} - {moment(thisRequest.endWorkDate).format("MM/DD/YYYY")}</td>
                        <td className='table-row'>{thisRequest.requestedSickTime}</td>
                        <td className='table-row'>{thisRequest.requestedVacationTime}</td>
                        <td className='table-row'>{thisRequest.ptoRequestStatus}</td>
                        <button className='employer-home-page-btns' onClick={() => handleClickone(thisRequest)}>Approve</button>
                        <button className='employer-home-page-btns' onClick={() => handleClicktwo(thisRequest)}>Deny</button>
                        <button className='employer-home-page-btns' onClick={() => handleClickthree(thisRequest)}>Edit PTO Time</button>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
      };

export default ViewTimeOffRequests