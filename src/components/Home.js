import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="pagebody">
      <h3>Hi there!!</h3>
      <h4>
        If you are new to our website you can create an account and start your
        cooking journey here{" "}
        <button>
          <Link to={{ pathname: `/register` }}>REGISTER</Link>
        </button>
      </h4>
      <h4>
        If you are already registered, we welcome you back, you just need to{" "}
        <button>
          <Link to={{ pathname: `/login` }}>LOGIN</Link>
        </button>
      </h4>
    </div>
  );
};

export default Home;
