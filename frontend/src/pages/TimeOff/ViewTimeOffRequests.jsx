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
              <Link to="/"><button className="back-btn">Back</button></Link>
              <table>
                <thead>
                  <tr className='table-col-center'>
                    <th className='table-col-center'>Name</th>
                    <th className='table-col-center'>Requested PTO Date(s)</th>
                    <th className='table-col-center'>Hours</th>
                    <th className='table-col-center'>Request Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ptoRequests.map((thisRequest) => {
                    console.log(thisRequest.startWorkDate)
                    console.log(thisRequest)
                    let hoursRequested = ((parseFloat(thisRequest.requestedSickTime))  + parseFloat(thisRequest.requestedVacationTime))
                    let s = new Date(thisRequest.startWorkDate);
                    let e = new Date(thisRequest.endWorkDate);
                    let startYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(s);
                    let startMonth = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(s);
                    let startDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(s);
                    let endYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(e);
                    let endMonth = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(e);
                    let endDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(e);
                    return (
                      <tr className='table-row-center'>
                        <td className='table-row-center'>{thisRequest.employee.firstName} {thisRequest.employee.lastName}</td>
                        <td className='table-row-center'>{moment(thisRequest.startWorkDate).format("MM/DD/YYYY")} - {moment(thisRequest.endWorkDate).format("MM/DD/YYYY")}</td>
                        <td className='table-row-center'>{hoursRequested.toFixed(2)}</td>
                        <td className='table-row-center'>{thisRequest.ptoRequestStatus}</td>
                        <button className='employer-pto-btns' onClick={() => handleClickone(thisRequest)}>Approve</button>
                        <button className='employer-pto-btns' onClick={() => handleClicktwo(thisRequest)}>Deny</button>
                        <button className='employer-pto-btns' onClick={() => handleClickthree(thisRequest)}>Edit PTO Time</button>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
      };

export default ViewTimeOffRequests