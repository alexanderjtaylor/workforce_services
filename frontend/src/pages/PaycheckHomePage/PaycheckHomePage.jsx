import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom"
import EmployerPaycheckHomePage from "./EmployerPaycheckHomePage";
import EmployeePaycheckHomePage from "./EmployeePaycheckHomePage";


const PaycheckHomePage = () => {
  const [user, token] = useAuth();

  return(
    <>
    {console.log(user)}
    {user.is_staff ? (
            <EmployerPaycheckHomePage/>
          ) : (
            <EmployeePaycheckHomePage/>
          )}
    </>
  )
}

export default PaycheckHomePage;