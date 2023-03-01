import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import useAuth from "../../hooks/useAuth"

const ViewPastPaychecks = (props) => {
    const [user, token] = useAuth();
    const [paychecks, setPaychecks] = useState([]);
    const navigate = useNavigate();
    const moment = require('moment');
    const { state } = useLocation();

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
            console.log((response.data))
            setPaychecks((response.data))
        } catch (error) {
            console.log(error.message);
        }
    }

              const handleClick = (paycheck) => {
                navigate(`/past-paycheck-display/${paycheck.id}`, {
                  state: {
                    paycheck_id: paycheck.id,
                    employee_id: paycheck.employee.id,
                    cutOffDate: paycheck.cutOffDate
                  }
                });
              };

    return (
    <div className="container">
      <Link to="/"><button className="home-btn">Home</button></Link>
      <h3 className="home-welcome">Employer: {state.employer_name}</h3>
      <h3 className="home-welcome">Employee: {state.firstName} {state.lastName}</h3>
      <table className='profile-tabel'>
          <thead>
            <tr className='table-col'>
              <th className='table-col'>End of Pay Period</th>
            </tr>
          </thead>
          <tbody>
            {paychecks.map((paycheck) => {
              return (
                <tr className='table-row'>
                  <td className='table-row'>{moment(paycheck.cutOffDate).format("MM/DD/YYYY")}</td>
                  <button className='home-page-btns' onClick={() => handleClick(paycheck)}>View Paycheck</button>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
    );
}
export default ViewPastPaychecks