import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const RequestTimeOffPage = () => {
  const [user, token] = useAuth();
  const [employee, setEmployee] = useState([]);
  const [companyName, setCompanyName] = useState([]);

  useEffect(() => {
    fetchEmployee();
  }, [token]);

  const fetchEmployee = async () => {
    let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data)
    setCompanyName(response.data.employer.companyName)
    setEmployee(response.data);
  }

return (
    <div className="container">
        <Link to="/"><button>Home</button></Link>
        <p>Please Note: Available time off balances do not account for any currently pending requests. Available hours will update after employer approval.</p>
        <table className='profile-tabel'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Sick Time Available</th>
              <th>Vacation Time Available</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.sickTime}</td>
                  <td>{employee.vacationTime}</td>
                </tr>
          </tbody>
        </table>
      </div>
    );
};

export default RequestTimeOffPage;