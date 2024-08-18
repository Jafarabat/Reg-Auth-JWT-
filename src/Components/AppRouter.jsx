import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";
import Login from "../pages/login/Login";
import Error from "../pages/errorPage/Error";
import { AuthContext } from "../context";

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          Component={route.component}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}

      <Route path="*" element={<Error />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          Component={route.component}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}

      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
