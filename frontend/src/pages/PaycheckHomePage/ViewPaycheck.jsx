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
                <th className='table-col-check'>Pay</th>
                <th className='table-col-check'>Hours</th>
                <th className='table-col-check'>Rate</th>
                <th className='table-col-check'>Total</th>
              </tr>
            </thead>
            <tbody>
            {paychecks?.map((check) => {
              let regPay = (check.hoursWorked * check.payRate).toFixed(2)
              return (
                <tr className='table-row-check'>
                  <td className='table-row-check'>Regular Pay</td>
                  <td className='table-row-check'>{check.hoursWorked}</td>
                  <td className='table-row-check'>${check.payRate}</td>
                  <td className='table-row-check'>${regPay}</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {paychecks?.map((check) => {
              let OTPay = (check.OTHoursWorked * check.OTPayRate).toFixed(2)
              return (
                <tr className='table-row-check'>
                  <td className='table-row-check'>Overtime Pay</td>
                  <td className='table-row-check'>{check.OTHoursWorked}</td>
                  <td className='table-row-check'>${check.OTPayRate}</td>
                  <td className='table-row-check'>${OTPay}</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {paychecks?.map((check) => {
              let sickPay = (check.sickTimeUsed * check.payRate).toFixed(2)
              return (
                <tr className='table-row-check'>
                  <td className='table-row-check'>Sick Pay</td>
                  <td className='table-row-check'>{check.sickTimeUsed}</td>
                  <td className='table-row-check'>${check.payRate}</td>
                  <td className='table-row-check'>${sickPay}</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {paychecks.map((check) => {
              let vacationPay = (check.vacationTimeUsed * check.payRate).toFixed(2)
              return (
                <tr className='table-row-check'>
                  <td className='table-row-check'>Vacation Pay</td>
                  <td className='table-row-check'>{check.vacationTimeUsed}</td>
                  <td className='table-row-check'>${check.payRate}</td>
                  <td className='table-row-check'>${vacationPay}</td>
                </tr>
              );
            })}
          </tbody>
          </table>
          <table className='profile-tabel'>
            <thead>
              <tr>
                <th className='table-col-check'>Taxes</th>
                <th className='table-col-check'></th>
                <th className='table-col-check'></th>
                <th className='table-col-check'>Total</th>
              </tr>
            </thead>
            <tbody>
            {paychecks.map((check) => {
              let taxPercentage = ((check.taxes * 100/100) * 100).toFixed(2) + '%'
              let regPay = (check.hoursWorked * check.payRate);
              let OTPay = (check.OTHoursWorked * check.OTPayRate);
              let sickPay = (check.sickTimeUsed * check.payRate);
              let vacationPay = (check.vacationTimeUsed * check.payRate);
              let grossPay = (regPay + OTPay + sickPay + vacationPay).toFixed(2);
              let taxDollars = ((regPay + OTPay + sickPay + vacationPay) * check.taxes).toFixed(2);
              return (
                <tr className='table-row-check'>
                  <td className='table-row-check'>Taxes</td>
                  <td className='table-row-check'></td>
                  <td className='table-row-check'></td>
                  <td className='table-row-check'>${taxDollars}</td>
                </tr>
              );
            })}
          </tbody>
          </table>
          <table className='profile-tabel'>
            <thead>
              <tr>
                <th className='table-col-check'>Summary</th>
                <th className='table-col-check'></th>
                <th className='table-col-check'></th>
                <th className='table-col-check'>Total</th>
              </tr>
            </thead>
            <tbody>
            {paychecks.map((check) => {
              let regPay = (check.hoursWorked * check.payRate);
              let OTPay = (check.OTHoursWorked * check.OTPayRate);
              let sickPay = (check.sickTimeUsed * check.payRate);
              let vacationPay = (check.vacationTimeUsed * check.payRate);
              let taxPercentage = ((check.taxes * 100/100) * 100) + '%';
              let grossPay = (regPay + OTPay + sickPay + vacationPay).toFixed(2);
              let taxDollars = ((regPay + OTPay + sickPay + vacationPay) * check.taxes).toFixed(2);
              return (
                <tr className='table-row-check'>
                  <td className='table-row-check'>Gross Pay</td>
                  <td className='table-row-check'></td>
                  <td className='table-row-check'></td>
                  <td className='table-row-check'>${grossPay}</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {paychecks.map((check) => {
              let regPay = (check.hoursWorked * check.payRate);
              let OTPay = (check.OTHoursWorked * check.OTPayRate);
              let sickPay = (check.sickTimeUsed * check.payRate);
              let vacationPay = (check.vacationTimeUsed * check.payRate);
              let taxPercentage = ((check.taxes * 100/100) * 100) + '%';
              let grossPay = (regPay + OTPay + sickPay + vacationPay).toFixed(2);
              let taxDollars = ((regPay + OTPay + sickPay + vacationPay) * check.taxes).toFixed(2);
              return (
                <tr className='table-row-check'>
                  <td className='table-row-check'>Taxes</td>
                  <td className='table-row-check'></td>
                  <td className='table-row-check'></td>
                  <td className='table-row-check'>${taxDollars}</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {paychecks.map((check) => {
              let regPay = (check.hoursWorked * check.payRate);
              let OTPay = (check.OTHoursWorked * check.OTPayRate);
              let sickPay = (check.sickTimeUsed * check.payRate);
              let vacationPay = (check.vacationTimeUsed * check.payRate);
              let taxPercentage = ((check.taxes * 100/100) * 100) + '%';
              let grossPay = (regPay + OTPay + sickPay + vacationPay).toFixed(2);
              let taxDollars = ((regPay + OTPay + sickPay + vacationPay) * check.taxes).toFixed(2);
              let netPay = (grossPay - taxDollars).toFixed(2);
              return (
                <tr className='table-row-check'>
                  <td className='table-row-check'>Net Pay</td>
                  <td className='table-row-check'></td>
                  <td className='table-row-check'></td>
                  <td className='table-row-check'>${netPay}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
    );
}
export default ViewPaycheck