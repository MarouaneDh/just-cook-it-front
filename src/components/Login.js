import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../JS/actions/authActions";
import HandleError from "./HandleError";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState();
  const user = useSelector((state) => state.authReducer.user);
  const Error = useSelector((state) => state.authReducer.error);
  const loading = useSelector((state) => state.authReducer.isLoading);

  const dispatch = useDispatch();
  const loginUser = (e) => {
    e.preventDefault();
    dispatch(
      login(
        {
          email,
          password,
        },
        history
      )
    );
  };
  // useEffect(() => {

  //   return () => {
  //     dispatch()
  //   }
  // }, [])
  return (
    <div>
      <div className="pagebody">
        <h1>LOGIN</h1>
        <div>
          {Error
            ? Error.map((el) => <HandleError error={el} key={`${el}`} />)
            : null}
        </div>
        <form className="signin">
          <label>Email : </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password : </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={loginUser}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
