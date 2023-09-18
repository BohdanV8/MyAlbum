import React, { useContext } from "react";
import { UserContext } from "../context";
import { Route, Routes } from "react-router-dom";
import { routesOfApp } from "../router/routes";
const AppRouter = () => {
  const { isAuth } = useContext(UserContext);
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
