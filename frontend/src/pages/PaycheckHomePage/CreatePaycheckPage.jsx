import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const CreatePayCheckPage = (props) => {
    const [user, token] = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(state, postNewPaycheck);
    const {employeeID} = useParams();
    const [punches, setPunches] = useState([]);
    const [punchValues, setPunchValues] = useState([]);
    console.log(state)

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
    let totalBillableHours = 0
    let values = ""
    let clockIn = ""
    let clockOut = ""
    let startLunch = 0
    let returnLunch = 0
    let sickTimeHoursUsed = 0
    let vacationTimeHoursUsed = 0
    let OTHoursWorked = 0
    let hoursWorked = 0
    let taxes = 0
    let cutOffDate = moment(endOfWeekTitle).format("YYYY-MM-DD");

    useEffect(() => {
        fetchPunches();
      }, [token]);

    const fetchPunches = async () => {
        try {
          let response = await axios.get(`http://127.0.0.1:8000/clock-in/${state.employee_id}/punches`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
        //   setPunches(todaysPunch(response.data));
        //   console.log(todaysPunch(response.data))
        console.log(thisWeeksPunches(response.data))
        setPunches(thisWeeksPunches(response.data))
        // let values = thisWeeksPunches(response.data).reduce(function(previousValue, currentValue){
        //     return {
        //         clockIn: previousValue.clockIn + currentValue.clockIn,
        //         clockOut: previousValue.clockOut + currentValue.clockOut,
        //         startLunch: previousValue.startLunch + currentValue.startLunch,
        //         returnLunch: previousValue.returnLunch + currentValue.returnLunch,
        //         sickTimeUsed: previousValue.shift.sickTimeUsed + currentValue.shift.sickTimeUsed,
        //         vacationTimeUsed: previousValue.shift.vacationTimeUsed + currentValue.shift.vacationTimeUsed,
        //     }
        //   });
        //   console.log(values);
        //   console.log(clockIn);
          // setPunches(response.data);
        } catch (error) {
          // console.log(response.data)
        }
      };

      function thisWeeksPunches(punches) {
        return punches.filter(punch => moment(punch.shift.workDate).isBetween(startDate, endDate));}
 
        //   var newValues = punches.reduce(function(previousValue, currentValue) {
        //     return {
        //         clockIn: previousValue.clockIn + currentValue.clockIn,
        //         clockOut: previousValue.clockOut + currentValue.clockOut,
        //         startLunch: previousValue.startLunch + currentValue.startLunch,
        //         returnLunch: previousValue.returnLunch + currentValue.returnLunch,
        //         sickTimeUsed: previousValue.shift.sickTimeUsed + currentValue.shift.sickTimeUsed,
        //         vacationTimeUsed: previousValue.shift.vacationTimeUsed + currentValue.shift.vacationTimeUsed,
        //     }
        //   });
        //   console.log(newValues);

        //   function paycheckNumbers(values) {
        //     if(values.clockOut - values.clockIn + (values.returnLunch - values.startLunch) >= 40){
        //         return{
        //         OTHoursWorked: (40 - (values.clockOut - values.clockIn + (values.startLunch - values.returnLunch))),
        //         hoursWorked: (OTHoursWorked - (values.clockOut - values.clockIn + (values.startLunch - values.returnLunch))),
        //         sickTimeUsed: values.sickTimeUsed,
        //         vacationTimeUsed: values.vacationTimeUsed,
        //         taxes: .20}}
        //     else{
        //         return{
        //         OTHoursWorked: 0,
        //         hoursWorked: (values.clockOut - values.clockIn + (values.startLunch - values.returnLunch)),
        //         sickTimeUsed: (values.sickTimeUsed ? sickTimeUsed: 0),
        //         vacationTimeUsed: (values.vacationTimeUsed ? vacationTimeUsed: 0),
        //         taxes: .20}}};

        //     paycheckNumbers(punches)
        //     console.log(paycheckNumbers(punches))

            // const totalHours = punches.map(clock => clockOut.clockOut - clock.clockIn + (values.startLunch - values.returnLunch));
            // console.log(totalHours);

            function roundTo(n, digits) {
                if (digits === undefined) {
                    digits = 0;
                }
        
                var multiplicator = Math.pow(10, digits);
                n = parseFloat((n * multiplicator).toFixed(11));
                return Math.round(n) / multiplicator;
            }


            function thePunchValues(punches){
                sickTimeHoursUsed = 0
                vacationTimeHoursUsed = 0
                totalBillableHours = 0
                OTHoursWorked = 0
                hoursWorked = 0
                taxes = 0
                for (let i = 0; i < punches.length; i++) {
                    if(totalBillableHours >= 40){   
                        sickTimeHoursUsed += punches[i].shift.sickTimeUsed;
                        vacationTimeHoursUsed += punches[i].shift.vacationTimeUsed;
                        const startTime = moment(punches[i].clockIn);
                        const startLunch = moment(punches[i].startLunch);
                        const returnLunch = moment(punches[i].returnLunch);
                        const endTime = moment(punches[i].clockOut);
                        const lunchDurationInMillis = returnLunch.diff(startLunch);
                        const shiftDurationInMillis = endTime.diff(startTime);
                        const finalDurationInMillis = shiftDurationInMillis - lunchDurationInMillis;
                        const durationInHours = moment.duration(finalDurationInMillis).asHours();
                        totalBillableHours += durationInHours
                        OTHoursWorked = ((totalBillableHours) - 40);
                        hoursWorked = (totalBillableHours - OTHoursWorked);
                        sickTimeHoursUsed = sickTimeHoursUsed;
                        vacationTimeHoursUsed = vacationTimeHoursUsed;
                        taxes = .20}
                    else{
                        // sickTimeHoursUsed += punches[i].shift.sickTimeUsed;
                        // vacationTimeHoursUsed += punches[i].shift.vacationTimeUsed;
                        sickTimeHoursUsed += moment.duration(punches[i].shift.sickTimeUsed).asHours();
                        vacationTimeHoursUsed += moment.duration(punches[i].shift.vacationTimeUsed).asHours();
                        const startTime = moment(punches[i].clockIn);
                        const startLunch = moment(punches[i].startLunch);
                        const returnLunch = moment(punches[i].returnLunch);
                        const endTime = moment(punches[i].clockOut);
                        const lunchDurationInMillis = returnLunch.diff(startLunch);
                        const shiftDurationInMillis = endTime.diff(startTime);
                        const finalDurationInMillis = shiftDurationInMillis - lunchDurationInMillis;
                        const durationInHours = moment.duration(finalDurationInMillis).asHours();
                        totalBillableHours += durationInHours;
                        OTHoursWorked = 0;
                        hoursWorked = Math.round((totalBillableHours + Number.EPSILON) * 100) / 100;
                        // sickTimeHoursUsed = sickTimeHoursUsed;
                        // vacationTimeHoursUsed = vacationTimeHoursUsed;
                        taxes = .20}}
                    }
                    
                    thePunchValues(punches)
                    console.log(thePunchValues(punches))

    async function postNewPaycheck(){
        formData["cutOffDate"] = cutOffDate
        formData["hoursWorked"] = hoursWorked
        formData["OTHoursWorked"] = OTHoursWorked
        formData["sickTimeUsed"] = sickTimeHoursUsed
        formData["vacationTimeUsed"] = vacationTimeHoursUsed
        formData["taxes"] = taxes
        try {
            let response = await axios.post("http://127.0.0.1:8000/paychecks/create-paycheck/", formData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            navigate("/paycheck-employer-home");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
    <div className="container">
        <form className="form" onSubmit={handleSubmit}>
        <label>
                Cut Off Date:{" "}
                <input type="text" name="cutOffDate" value={cutOffDate} onChange={handleInputChange}/>
            </label>
            <label>
                Employee ID:{" "}
                <input type="text" name="employee_id" value={formData.employee_id} onChange={handleInputChange}/>
            </label>
            <label>
                Pay Rate:{" "}
                <input type="text" name="payRate" value={formData.payRate} onChange={handleInputChange}/>
            </label>
            <label>
                Overtime Rate:{" "}
                <input type="text" name="OTPayRate" value={formData.OTPayRate} onChange={handleInputChange}/>
            </label>
            <label>
                Base Pay Hours:{" "}
                <input type="text" name="hoursWorked" value={hoursWorked} onChange={handleInputChange}/>
            </label>
            <label>
                Overtime Hours:{" "}
                <input type="text" name="OTHoursWorked" value={OTHoursWorked} onChange={handleInputChange}/>
            </label>
            <label>
                Sick Time:{" "}
                <input type="text" name="sickTimeUsed" value={sickTimeHoursUsed} onChange={handleInputChange}/>
            </label>
            <label>
                Vacation Time:{" "}
                <input type="text" name="vacationTimeUsed" value={vacationTimeHoursUsed} onChange={handleInputChange}/>
            </label>
            <label>
                Taxes:{" "}
                <input type="text" name="taxes" value={taxes} onChange={handleInputChange}/>
            </label>
            <button className='add-paycheck-btn'>Issue Paycheck</button>
        </form>
    </div>
    );
}
export default CreatePayCheckPage