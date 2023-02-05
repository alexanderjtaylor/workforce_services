import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import useAuth from "../../hooks/useAuth"
import useCustomForm from "../../hooks/useCustomForm"

const ViewPaycheck = (props) => {
    const [user, token] = useAuth();
    const [paychecks, setPaychecks] = useState();

    useEffect(() => {
        getPaycheck();
      }, [token]);

    async function getPaycheck(){
        try {
            let response = await axios.get(`http://127.0.0.1:8000/paychecks/${props.employee.id}/paychecks`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            console.log(response.data)
            setPaychecks(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
    <div className="container">
    </div>
    );
}
export default ViewPaycheck