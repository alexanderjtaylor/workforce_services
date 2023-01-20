import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {StrictMode} from 'react';
import {createRoot} from "react-dom";
import EmployerHomePage from "./EmployerHomePage";
import EmployeeHomePage from "./EmployeeHomePage";
import SearchEmployeePage from "../SearchEmployeePage/SearchEmployeePage";

const HomePage = () => {
  const [user, token] = useAuth();

  return(
    <>
    {console.log(user)}
    {user.is_staff ? (
            <EmployerHomePage/>
            // <SearchEmployeePage/>
          ) : (
            <EmployeeHomePage/>
          )}
    </>
  )
}

export default HomePage;