import React from "react";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
  const isAlreadySignin = localStorage.getItem('userId');
  if (isAlreadySignin) return <Redirect to="/home" />;
  else if (!isAlreadySignin) return <Redirect to="/" />;

  return <Route {...props} />;
};



export default AuthRoute;