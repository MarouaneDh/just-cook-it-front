import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logout } from "../JS/actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.authReducer.user);

  const isAuth = useSelector((state) => state.authReducer.isAuth);
  return (
    <nav>
      <div>
        {isAuth ? (
          <ul className="nav">
            <Link to={{ pathname: "/dashboard" }}>
              <li className="homepage"></li>
            </Link>
            <Link to={{ pathname: `/profile/${user._id}` }}>
              <li>Profile</li>
            </Link>
            {user.role == "admin" ? (
              <Link to={{ pathname: `/users/` }}>
                <li>Users</li>
              </Link>
            ) : null}
            <Link to={{ pathname: "/myrecipes" }}>
              <li>My Recipes</li>
            </Link>
            <Link to={{ pathname: "/discover/page/1" }}>
              <li>Discover Recipes</li>
            </Link>
            {user.role == "user" ? (
              <Link to={{ pathname: "/aboutus" }}>
                <li>About Us</li>
              </Link>
            ) : null}
            <li
              onClick={() => {
                dispatch(logout());
                history.push("/");
              }}
            >
              Logout
            </li>
          </ul>
        ) : (
          <ul className="nav">
            <Link to={{ pathname: "/" }}>
              <li className="homepage"></li>
            </Link>
            <Link to={{ pathname: "/discover/page/1" }}>
              <li>Discover Recipes</li>
            </Link>
            <Link to={{ pathname: "/aboutus" }}>
              <li>About Us</li>
            </Link>
            <Link to={{ pathname: "/Register" }}>
              <li>REGISTER</li>
            </Link>
            <Link to={{ pathname: "/Login" }}>
              <li>LOGIN</li>
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
