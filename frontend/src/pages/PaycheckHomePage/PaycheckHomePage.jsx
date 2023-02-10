import React from "react";
import axios from "axios";
// import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
// import {useNavigate} from "react-router-dom"
import EmployerPaycheckHomePage from "./EmployerPaycheckHomePage";
import EmployeePaycheckHomePage from "./EmployeePaycheckHomePage";


const PaycheckHomePage = () => {
  const [user, token] = useAuth();
  const [employer, setEmployer] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [companyName, setCompanyName] = useState([]);

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
    console.log(response.data)
    setEmployer(response.data);
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
            <EmployerPaycheckHomePage employer = {employer} setEmployer = {setEmployer}/>
          ) : (
            <EmployeePaycheckHomePage employee = {employee} setEmployee = {setEmployee} companyName = {companyName} setCompanyName = {setCompanyName}/>
          )}
    </>
  )
}

export default PaycheckHomePage;