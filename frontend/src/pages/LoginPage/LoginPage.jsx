import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <Link to="/register">Click to register!</Link>
        <button className='login-page-btns'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;



// function UserEmployer(props) {
//   return <div>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <EmployerHomePage />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//   </div>;
// }

// function UserEmployee(props) {
//   return <div>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <EmployeeHomePage />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//   </div>;
// }

// function UserIs(props) {
//   const isEmployer = props.isEmployer;
//   if (isEmployer) {
//     return <UserEmployer />;
//   }
//   return <UserEmployee />;
// }

// const userroot = ReactDOM.createRoot(document.getElementById('userroot')); 
// userroot.render(<UserIs isEmployer={true} />);