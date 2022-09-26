import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Registro = (props) => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.registro(email, password, repeat);
  };

  return (
    <>
      {store.register ? (
        <Navigate to="/login" />
      ) : (
        <div className="container mt-5">
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-3">
              <label forhtml="labelEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label forhtml="labelPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="mb-3">
              <label forhtml="labelRepeatPassword" className="form-label">
                Repeat Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPasswordRepeat"
                onChange={(e) => setRepeat(e.target.value)}
                value={repeat}
              />
            </div>
            <div className="d-flex justify-content-center mb-2">
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
