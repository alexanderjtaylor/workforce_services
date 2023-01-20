import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {StrictMode} from 'react';
import {createRoot} from "react-dom";
import EmployerHomePage from "../EmployerHomePage/EmployerHomePage";
import EmployeeHomePage from "../EmployeeHomePage/EmployeeHomePage";
import SearchEmployeePage from "../SearchEmployeePage/SearchEmployeePage";

const HomePage = () => {
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);

  return(
    <>
    {console.log(user)}
    {user.is_staff ? (
            // <EmployerHomePage/>
            <SearchEmployeePage/>
          ) : (
            <EmployeeHomePage/>
          )}
    </>
  )
}

export default HomePage;




//     const fetchCars = async () => {
//       try {
//         let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         setCars(response.data);
//       } catch (error) {
//         console.log(error.response.data);
//       }
//     };
//     fetchCars();
//   }, [token]);
//   return (
//     <div className="container">
//       <h1>Home Page for {user.username}!</h1>
//       {cars &&
//         cars.map((car) => (
//           <p key={car.id}>
//             {car.year} {car.model} {car.make}
//           </p>
//         ))}
//     </div>
//   );
// };




//   useEffect(() => {
      
//     function AdminGreeting(props) {
//       return <h1>Welcome {user.username}</h1>;
//     }
    
//     function UserGreeting(props) {
//       return <h1>Welcome {user.first_name}</h1>;
//     }

//     function Greeting(props) {
//       const is_staff = props.is_staff;
//       if (is_staff) {
//         return <AdminGreeting />;
//       }
//       return <UserGreeting />;
//     }})

//     const root = ReactDOM.createRoot(document.getElementById('root')); 
//     root.render(<Greeting is_staff={true}/>);    

// }