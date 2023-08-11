import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../JS/actions/authActions";
import HandleError from "./HandleError";

const Register = ({ history }) => {
  const Error = useSelector((state) => state.authReducer.error);
  const [role, setRole] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");

  const dispatch = useDispatch();
  const addUser = (e) => {
    e.preventDefault();
    dispatch(
      register(
        {
          role,
          firstName,
          lastName,
          email,
          password,
          gender,
          birthday,
          country,
          state,
          city,
          street,
          zipCode,
        },
        history
      )
    );
  };

  return (
    <div>
      <div className="pagebody">
        <h1 className="nav">REGISTER</h1>
        {Error
          ? Error.map((el) => <HandleError error={el} key={`${el}`} />)
          : null}
        <form className="registration">
          <div className="first-part">
            <label>Fisrt name : </label>
            <input
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="first name"
            />
            <label>Last name : </label>
            <input
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="last name"
            />
            <label>Birthday : </label>
            <input
              name="birthday"
              type="date"
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="birthday date"
            />
            <label>Email : </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <label> Password : </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <p>your password has to contain at least 8 caracters</p>
          </div>
          <div className="second-part">
            <label>Gender : </label>
            <select name="gender" onChange={(e) => setGender(e.target.value)}>
              <option value="male">none</option>
              <option value="male">Male</option>
              <option value="female">female</option>
            </select>
            <label>Country : </label>
            <input
              name="country"
              onChange={(e) => setCountry(e.target.value)}
              placeholder="country"
            />
            <label>State : </label>
            <input
              name="state"
              onChange={(e) => setState(e.target.value)}
              placeholder="state"
            />
            <label>City : </label>
            <input
              name="city"
              onChange={(e) => setCity(e.target.value)}
              placeholder="city"
            />
            <label>Street : </label>
            <input
              name="street"
              onChange={(e) => setStreet(e.target.value)}
              placeholder="street"
            />
            <label>Zip code : </label>
            <input
              name="zipCode"
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="zip code"
            />
            <button
              className="register"
              onClick={(e) => {
                addUser(e);
              }}
            >
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
