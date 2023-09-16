import React, { useContext } from "react";
import { AuthContext } from "../context";
import { Route, Routes } from "react-router-dom";
import { routesOfApp } from "../router/routes";
const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? (
    <div></div>
  ) : (
    <Routes>
      {routesOfApp.map((el) => (
        <Route path={el.path} element={<el.element />} key={el.path} />
      ))}
    </Routes>
  );
};
export default AppRouter;
