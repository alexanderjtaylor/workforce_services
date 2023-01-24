import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom"
import SetSchedulePage from "./SetSchedulePage";
import ViewSchedulePage from "./ViewSchedulePage";


const SchedulePage = () => {
  const [user, token] = useAuth();

  return(
    <>
    {console.log(user)}
    {user.is_staff ? (
            <SetSchedulePage/>
          ) : (
            <ViewSchedulePage/>
          )}
    </>
  )
}

export default SchedulePage;