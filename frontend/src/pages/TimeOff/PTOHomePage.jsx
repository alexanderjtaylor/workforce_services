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
  const [employer, setEmployer] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserType();
  }, [token]);

  const fetchUserType = async () => {
    try {
    let response = await axios.get(`http://127.0.0.1:8000/employers/${user.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data.id)
    setEmployer(response.data.id);
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

const handleClickone = (employer) => {
  navigate(`/view-pto-requests/${employer.id}`, {
    state: {
      employer_id: employer.id,
    }
  });
};


return(
  <>
  {console.log(user)}
  {user.is_staff ? (
          <ViewTimeOffRequests/>
        ) : (
          <RequestTimeOffPage employee = {employee} setEmployee = {setEmployee} companyName = {companyName} setCompanyName = {setCompanyName}/>
        )}
  </>
)
}
export default TimeOffHomePage;



