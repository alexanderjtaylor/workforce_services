import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const PastPaycheckDisplay = (props) => {
    const [user, token] = useAuth();
    const [paychecks, setPaychecks] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [employer, setEmployer] = useState([]);
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
    let cutOff = state.cutOffDate
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
    const taxes = parseInt(paychecks.taxes).toFixed(2);
    const grossPay = regPay + OTPay + sickPay + vacationPay;
    const netPay = grossPay * taxes;
    let taxDollars = ((regPay + OTPay + sickPay + vacationPay) * paychecks.taxes).toFixed(2);

    useEffect(() => {
        getPaycheck();
        fetchEmployee();
      }, [token]);

    async function getPaycheck(){
        try {
            let response = await axios.get(`http://127.0.0.1:8000/paychecks/home/${state.paycheck_id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            console.log((response.data))
            setPaychecks((response.data))
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchEmployee = async () => {
        try {
          let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setEmployer(response.data.employer.companyName);
          setEmployee(response.data);
        } catch (error) {
          console.log(error.response.data);
        }
      };
      
            console.log((paychecks.hoursWorked))
            console.log((paychecks.payRate))

    const handleClick = (employee) => {
            navigate(`/view-past-paychecks/${state.employee_id}`, {
              state: {
                employee_id: state.employee_id
              }
            });
          };

    return (
        
    <div className="container">
      <button className='back-btn' onClick={() => handleClick(employee)}>Back</button>
      <h3 className="home-welcome">Employer: {employer}</h3>
      <h3 className="home-welcome">Employee: {employee.firstName} {employee.lastName}</h3>
      <h3 className="home-welcome">Pay Period Cut Off: {moment(cutOff).format("MM/DD/YYYY")}</h3>
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
              
                <tr className='table-row-check'>
                  <td className='table-row-check'>Regular Pay</td>
                  <td className='table-row-check'>{paychecks.hoursWorked}</td>
                  <td className='table-row-check'>${paychecks.payRate}</td>
                  <td className='table-row-check'>${(paychecks.hoursWorked * paychecks.payRate).toFixed(2)}</td>
                </tr>
              
          </tbody>
          <tbody>
              
                <tr className='table-row-check'>
                  <td className='table-row-check'>Overtime Pay</td>
                  <td className='table-row-check'>{paychecks.OTHoursWorked}</td>
                  <td className='table-row-check'>${paychecks.OTPayRate}</td>
                  <td className='table-row-check'>${(paychecks.OTHoursWorked * paychecks.OTPayRate).toFixed(2)}</td>
                </tr>
              
          </tbody>
          <tbody>
             
                <tr className='table-row-check'>
                  <td className='table-row-check'>Sick Pay</td>
                  <td className='table-row-check'>{paychecks.sickTimeUsed}</td>
                  <td className='table-row-check'>${paychecks.payRate}</td>
                  <td className='table-row-check'>${(paychecks.sickTimeUsed * paychecks.payRate).toFixed(2)}</td>
                </tr>
              
          </tbody>
          <tbody>
             
                <tr className='table-row-check'>
                  <td className='table-row-check'>Vacation Pay</td>
                  <td className='table-row-check'>{paychecks.vacationTimeUsed}</td>
                  <td className='table-row-check'>${paychecks.payRate}</td>
                  <td className='table-row-check'>${(paychecks.vacationTimeUsed * paychecks.payRate).toFixed(2)}</td>
                </tr>
              
          </tbody>
          </table>
          <table className='profile-tabel'>
            <thead>
              <tr>
                <th className='table-col-check'>Taxes</th>
                <th className='table-col-check'>Total</th>
              </tr>
            </thead>
            <tbody>
              
                <tr className='table-row-check'>
                  <td className='table-row-check'>Taxes</td>
                  <td className='table-row-check'>${(((paychecks.hoursWorked * paychecks.payRate) + (paychecks.OTHoursWorked * paychecks.OTPayRate) + (paychecks.sickTimeUsed * paychecks.payRate) + (paychecks.vacationTimeUsed * paychecks.payRate)) * (paychecks.taxes)).toFixed(2)}</td>
                </tr>
              
          </tbody>
          </table>
          <table className='profile-tabel'>
            <thead>
              <tr>
                <th className='table-col-check'>Summary</th>
                <th className='table-col-check'>Total</th>
              </tr>
            </thead>
            <tbody>

                <tr className='table-row-check'>
                  <td className='table-row-check'>Gross Pay</td>
                  <td className='table-row-check'>${((paychecks.hoursWorked * paychecks.payRate) + (paychecks.OTHoursWorked * paychecks.OTPayRate) + (paychecks.sickTimeUsed * paychecks.payRate) + (paychecks.vacationTimeUsed * paychecks.payRate)).toFixed(2)}</td>
                </tr>
             
          </tbody>
          <tbody>
              
                <tr className='table-row-check'>
                  <td className='table-row-check'>Taxes</td>
                  <td className='table-row-check'>${(((paychecks.hoursWorked * paychecks.payRate) + (paychecks.OTHoursWorked * paychecks.OTPayRate) + (paychecks.sickTimeUsed * paychecks.payRate) + (paychecks.vacationTimeUsed * paychecks.payRate)) * (paychecks.taxes)).toFixed(2)}</td>
                </tr>
              
          </tbody>
          <tbody>
                <tr className='table-row-check'>
                  <td className='table-row-check'>Net Pay</td>
                  <td className='table-row-check'>${(((paychecks.hoursWorked * paychecks.payRate) + (paychecks.OTHoursWorked * paychecks.OTPayRate) + (paychecks.sickTimeUsed * paychecks.payRate) + (paychecks.vacationTimeUsed * paychecks.payRate)).toFixed(2) - (((paychecks.hoursWorked * paychecks.payRate) + (paychecks.OTHoursWorked * paychecks.OTPayRate) + (paychecks.sickTimeUsed * paychecks.payRate) + (paychecks.vacationTimeUsed * paychecks.payRate)) * (paychecks.taxes)).toFixed(2)).toFixed(2)}</td>
                </tr>
              
          </tbody>
        </table>
    </div>
    );
}
export default PastPaycheckDisplay