import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Favourite from "./Favourite";

const DashBoard = () => {
  const user = useSelector((state) => state.authReducer.user);
  let x = "";
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  if (isAuth) {
    if (user.gender === "male") {
      x = "Mr. ";
    } else {
      x = "Mrs. ";
    }
  }
  return (
    <div>
      <div className="pagebody">
        <h2>Dashboard</h2>
        {isAuth ? (
          <div>
            <h1>
              Hello {x}
              {user.firstName} {user.lastName}
            </h1>
            <p>Welcome to your DashBoard</p>
            <Favourite />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashBoard;
