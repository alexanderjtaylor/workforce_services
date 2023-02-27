import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const ViewPaycheck = (props) => {
    const [user, token] = useAuth();
    const [paychecks, setPaychecks] = useState([]);
    const navigate = useNavigate();
    const { state } = useLocation();
    const moment = require('moment');
    let dayOfWeek = moment().day();
    let numDay = moment().date(); 
    let start = new Date();
    let startWeekTitle = new Date();
    start.setDate((numDay - dayOfWeek) - 1);
    startWeekTitle.setDate((numDay - dayOfWeek));
    start.setHours(0, 0, 0, 0);
    let startOfWeek = moment(start).format("MM/DD/YYYY");
    let startOfWeekTitle = moment(startWeekTitle).format("MM/DD/YYYY");
    let end = new Date();
    let endWeekTitle = new Date();
    end.setDate(numDay + (7 - dayOfWeek));
    endWeekTitle.setDate(numDay + (6 - dayOfWeek));
    end.setHours(0, 0, 0, 0);
    let endOfWeek = moment(end).format("MM/DD/YYYY");
    let endOfWeekTitle = moment(endWeekTitle).format("MM/DD/YYYY");
    const startDate = moment(startOfWeek, "MM/DD/YYYY");  
    const endDate = moment(endOfWeek, "MM/DD/YYYY");
    let cutOffDate = endOfWeekTitle;
    console.log(cutOffDate)  

    useEffect(() => {
        getPaycheck();
      }, [token]);

    async function getPaycheck(){
        try {
            let response = await axios.get(`http://127.0.0.1:8000/paychecks/${state.employee_id}/paychecks`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            console.log(thisWeeksPaycheck(response.data))
            setPaychecks(thisWeeksPaycheck(response.data))
            // setPaychecks(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    function thisWeeksPaycheck(paychecks) {
        return paychecks.filter(paycheck => moment(paycheck.cutOffDate).isBetween(startDate, endDate));}

    return (
    <div className="container">
      <Link to="/"><button className="home-btn">Home</button></Link>
      <h3 className="home-welcome">Employer: {state.employer_name}</h3>
      <h3 className="home-welcome">Employee: {state.firstName} {state.lastName}</h3>
      <h3 className="home-welcome">Pay Period: {startOfWeekTitle} - {endOfWeekTitle}</h3>
            <table className='profile-tabel'>
            <thead>
              <tr>
                <th className='table-col'>Pay</th>
                <th className='table-col'>Hours</th>
                <th className='table-col'>Rate</th>
                <th className='table-col'>Total</th>
              </tr>
            </thead>
            <tbody>
            {/* {paychecks.map((check) => { */}
              {/* return ( */}
                <tr className='table-row'>
                  <td className='table-row'>Regular Pay</td>
                  <td className='table-row'>40</td>
                  <td className='table-row'>20.00</td>
                  <td className='table-row'>800.00</td>
                  {/* <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td> */}
                </tr>
                
              {/* ); */}
            {/* // })} */}
            </tbody>
            <tbody>
            {/* {paychecks.map((check) => { */}
              {/* return ( */}
                <tr className='table-row'>
                  <td className='table-row'>Overtime Pay</td>
                  <td className='table-row'>4</td>
                  <td className='table-row'>30.00</td>
                  <td className='table-row'>120.00</td>
                  {/* <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td> */}
                </tr>
                
              {/* ); */}
            {/* // })} */}
            </tbody>
            <tbody>
            {/* {paychecks.map((check) => { */}
              {/* return ( */}
                <tr className='table-row'>
                  <td className='table-row'>Sick Pay</td>
                  <td className='table-row'>0</td>
                  <td className='table-row'>20.00</td>
                  <td className='table-row'>0.00</td>
                  {/* <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td> */}
                </tr>
                
              {/* ); */}
            {/* // })} */}
            </tbody>
            <tbody>
            {/* {paychecks.map((check) => { */}
              {/* return ( */}
                <tr className='table-row'>
                  <td className='table-row'>Vacation Pay</td>
                  <td className='table-row'>0</td>
                  <td className='table-row'>20.00</td>
                  <td className='table-row'>0.00</td>
                  {/* <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td> */}
                </tr>
                
              {/* ); */}
            {/* // })} */}
            </tbody>
          </table>
          <table className='profile-tabel'>
            <thead>
              <tr>
                <th className='table-col'>Taxes</th>
                <th className='table-col'></th>
                <th className='table-col'></th>
                <th className='table-col'>Total</th>
              </tr>
            </thead>
            <tbody>
            {/* {paychecks.map((check) => { */}
              {/* return ( */}
                <tr className='table-row'>
                  <td className='table-row'>All Taxes</td>
                  <td className='table-row'></td>
                  <td className='table-row'></td>
                  <td className='table-row'>184.00</td>
                  {/* <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td> */}
                </tr>
                
              {/* ); */}
            {/* // })} */}
            </tbody>
            {/* <tbody>
            {paychecks.map((check) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>OT Pay</td>
                  <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td>
                </tr>
              );
            })}
            </tbody> */}
          </table>
          <table className='profile-tabel'>
            <thead>
              <tr>
                <th className='table-col'>Summary</th>
                <th className='table-col'></th>
                <th className='table-col'></th>
                <th className='table-col'>Total</th>
              </tr>
            </thead>
            <tbody>
            {/* {paychecks.map((check) => { */}
              {/* return ( */}
                <tr className='table-row'>
                  <td className='table-row'>Gross Pay</td>
                  <td className='table-row'></td>
                  <td className='table-row'></td>
                  <td className='table-row'>920.00</td>
                  {/* <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td> */}
                </tr>
                
              {/* ); */}
            {/* // })} */}
            </tbody>
            <tbody>
            {/* {paychecks.map((check) => { */}
              {/* return ( */}
                <tr className='table-row'>
                  <td className='table-row'>Taxes</td>
                  <td className='table-row'></td>
                  <td className='table-row'></td>
                  <td className='table-row'>184.00</td>
                  {/* <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td> */}
                </tr>
                
              {/* ); */}
            {/* // })} */}
            </tbody>
            <tbody>
            {/* {paychecks.map((check) => { */}
              {/* return ( */}
                <tr className='table-row'>
                  <td className='table-row'>Net Pay</td>
                  <td className='table-row'></td>
                  <td className='table-row'></td>
                  <td className='table-row'>736.00</td>
                  {/* <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td> */}
                </tr>
                
              {/* ); */}
            {/* // })} */}
            </tbody>
            {/* <tbody>
            {paychecks.map((check) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>OT Pay</td>
                  <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td>
                </tr>
              );
            })}
            </tbody> */}
          </table>
    </div>
    );
}
export default ViewPaycheck