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
            
            setPaychecks( thisWeeksPaycheck(response.data))
            // setPaychecks(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

     function thisWeeksPaycheck(paychecks) {
        return paychecks.filter(paycheck => moment(paycheck.cutOffDate).isBetween(startDate, endDate));}

        function paycheckValues(paychecks){
                  const regHours = parseInt(paychecks.hoursWorked);

                  const regRate = parseInt(paychecks.payRate);
                  const OTHours = parseInt(paychecks.OTHoursWorked);
                  const otRate = parseInt(paychecks.OTPayRate);
                  const regPay = regHours * regRate;
                  const OTPay = OTHours * otRate;
                  const sickHours = parseInt(paychecks.sickTimeUsed);
                  const sickPay = sickHours * regRate;
                  const vacationHours = parseInt(paychecks.vacationTimeUsed);
                  const vacationPay = vacationHours * regRate;
                  const taxes = parseInt(paychecks.taxes);
                  const grossPay = regPay + OTPay + sickPay + vacationPay;
                  const netPay = grossPay * taxes;







                  // const startLunch = moment(punches[i].startLunch);
                  // const returnLunch = moment(punches[i].returnLunch);
                  // const endTime = moment(punches[i].clockOut);
                  // const lunchDurationInMillis = returnLunch.diff(startLunch);
                  // const shiftDurationInMillis = endTime.diff(startTime);
                  // const finalDurationInMillis = shiftDurationInMillis - lunchDurationInMillis;
                  // const durationInHours = moment.duration(finalDurationInMillis).asHours();
                  // totalBillableHours += durationInHours;
                  // console.log(durationInHours)
                  // console.log(totalBillableHours)
                  // {totalBillableHours >= 40 ? (
                  //     OTHoursWorked = Math.round((((totalBillableHours) - 40) + Number.EPSILON) * 100) / 100
                  //   ) : (
                  //     OTHoursWorked = 0
                  //   )}
                  // // OTHoursWorked = ((totalBillableHours) - 40);
                  // // OTHoursWorked = 0;
                  // // hoursWorked = (totalBillableHours - OTHoursWorked);
                  // hoursWorked = Math.round(((totalBillableHours - OTHoursWorked) + Number.EPSILON) * 100) / 100;
                  // taxes = .20}
                    }
              
              
              paycheckValues(paychecks)

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
            {paychecks?.map((check) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>Regular Pay</td>
                  <td className='table-row'>{check.hoursWorked}</td>
                  <td className='table-row'>{check.payRate}</td>
                  <td className='table-row'>{check.hoursWorked * check.payRate}</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {paychecks?.map((check) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>Overtime Pay</td>
                  <td className='table-row'>{check.OTHoursWorked}</td>
                  <td className='table-row'>{check.OTPayRate}</td>
                  <td className='table-row'>({check.hoursWorked * check.payRate})</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {paychecks?.map((check) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>Sick Pay</td>
                  <td className='table-row'>{check.sickTimeUsed}</td>
                  <td className='table-row'>{check.payRate}</td>
                  <td className='table-row'>({check.hoursWorked * check.payRate})</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {paychecks.map((check) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>Vacation Pay</td>
                  <td className='table-row'>{check.vacationTimeUsed}</td>
                  <td className='table-row'>{check.payRate}</td>
                  <td className='table-row'>({check.hoursWorked * check.payRate})</td>
                </tr>
              );
            })}
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
            {paychecks.map((check) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>Taxes</td>
                  <td className='table-row'></td>
                  <td className='table-row'></td>
                  <td className='table-row'>({check.taxes})</td>
                </tr>
              );
            })}
          </tbody>
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
            {paychecks.map((check) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>Gross Pay</td>
                  <td className='table-row'></td>
                  <td className='table-row'></td>
                  <td className='table-row'>({check.taxes})</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {paychecks.map((check) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>Taxes</td>
                  <td className='table-row'></td>
                  <td className='table-row'></td>
                  <td className='table-row'>({check.taxes})</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {paychecks.map((check) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>Net Pay</td>
                  <td className='table-row'></td>
                  <td className='table-row'></td>
                  <td className='table-row'>({check.taxes})</td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
    );
}
export default ViewPaycheck