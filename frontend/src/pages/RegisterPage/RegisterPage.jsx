import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    is_staff: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    createUser
  );

  async function createUser(){
    try {
        let response = await axios.post("http://127.0.0.1:8000/api/auth/register/", formData);
        navigate("/login");
    } catch (error) {
        console.log(error.message);
    }
}

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
      <p style={{ fontSize: "10px" }}>
          NOTE: Employers please enter "1" & Employees enter "0".
      </p>
      <label>
          Employer/Employee:{" "}
          <input
            type="text"
            name="is_staff"
            value={formData.is_staff}
            onChange={handleInputChange}
          />
        </label>
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
          First Name:{" "}
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <p style={{ fontSize: "10px" }}>
          NOTE: Make password uncommon with characters, numbers, and
          special characters!
        </p>
        <button className='edit-delete-shift-btns'>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
