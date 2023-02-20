import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import RequestTimeOffPage from "./RequestTimeOffPage";
import ViewTimeOffRequests from "./ViewTimeOffRequests";

const TimeOffHomePage = () => {
  const [user, token] = useAuth();
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [companyName, setCompanyName] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, [token]);

  const fetchEmployees = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}/employees`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      let response = await axios.get(`http://127.0.0.1:8000/employees/${user.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data)
      setCompanyName(response.data.employer.companyName)
      setEmployee(response.data);
    }
  };

return(
  <>
  {console.log(user)}
  {user.is_staff ? (
          <ViewTimeOffRequests employees = {employees} setEmployees = {setEmployees}/>
        ) : (
          <RequestTimeOffPage employee = {employee} setEmployee = {setEmployee} companyName = {companyName} setCompanyName = {setCompanyName}/>
        )}
  </>
)
}
export default TimeOffHomePage;


