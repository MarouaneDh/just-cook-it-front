import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/navbar";
import DashBoard from "./components/DashBoard";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "./JS/actions/authActions";
import Home from "./components/Home";
import PrivateRoute from "./router/PrivateRoute";
import MyRecipes from "./components/MyRecipes";
import AboutUs from "./components/AboutUs";
import Discover from "./components/Discover";
import AddRecipe from "./components/AddRecipe";
import Recipe from "./components/Recipe";
import Profile from "./components/Profile";
import WhatCanICook from "./components/WhatCanICook";
import Users from "./components/Users";

function App() {
  const dispatch = useDispatch();
  const getUser = () => dispatch(getAuthUser());
  useEffect(() => {
    getUser();
  }, []);
  const msg = useSelector((state) => state.authReducer.msg);

  // useEffect(() => {
  //   alert(`${msg}`);
  // }, [msg]);
  return (
    <div className="main">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Register" component={Register} />
        <Route path="/Login" component={Login} />
        <Route path="/aboutus" component={AboutUs} />
        <Route exact path="/discover/page/:pageNumber" component={Discover} />
        <PrivateRoute path="/profile/:id" component={Profile} />
        <PrivateRoute path={`/dashboard`} component={DashBoard} />
        <PrivateRoute path={`/whatCanICook`} component={WhatCanICook} />
        <PrivateRoute
          path={["/addRecipe", "/edit/:id"]}
          component={AddRecipe}
        />
        <PrivateRoute path="/myrecipes" component={MyRecipes} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/:id" component={Recipe} />
      </Switch>
    </div>
  );
}

export default App;
