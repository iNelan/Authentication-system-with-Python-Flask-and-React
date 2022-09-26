import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      {" "}
      {store.auth ? <p> You are logged in </p> : ""}{" "}
    </div>
  );
};
