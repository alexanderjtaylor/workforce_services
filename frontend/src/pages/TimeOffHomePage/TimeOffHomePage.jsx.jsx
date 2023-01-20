import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom"


const TimeOffHomePage = () => {
  const [user, token] = useAuth();

  return(
    <>
    {console.log(user)}
    {user.is_staff ? (
            <h1>Welcome {user.username}</h1>
          ) : (
            <h1>Hello {user.username}</h1>
          )}
    </>
  )
}

export default TimeOffHomePage;