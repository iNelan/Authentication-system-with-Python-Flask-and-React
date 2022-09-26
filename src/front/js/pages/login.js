import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login(email, password);
  };

  return (
    <>
      {" "}
      {store.auth ? (
        <Navigate to="/" />
      ) : (
        <div className="container pt-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label forhtml="labelEmail" className="form-label">
                Email{" "}
              </label>{" "}
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />{" "}
            </div>{" "}
            <div className="mb-3">
              <label forhtml="labelPassword" className="form-label">
                Password{" "}
              </label>{" "}
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />{" "}
            </div>
            <div className="d-flex justify-content-center mb-2">
              <button type="submit" className="btn btn-primary w-100">
                Acceder{" "}
              </button>{" "}
            </div>{" "}
            <p className="d-flex justify-content-center">
              <Link to="/register"> Register </Link>{" "}
            </p>{" "}
          </form>{" "}
        </div>
      )}{" "}
    </>
  );
};
