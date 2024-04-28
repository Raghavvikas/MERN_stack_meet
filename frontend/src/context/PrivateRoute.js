import { Outlet, Navigate } from "react-router-dom";
import Home from "../page/home";
import Login from "../page/login";

export const PrivateRoute = ({ children, ...rest }) => {
  let auth = localStorage.token;
  return auth?.length ? (
    <Outlet />
  ) : (
    <Navigate to={"/api/users/login"} element={<Login />} />
  );
};

export const GuestRoutes = ({ children, ...rest }) => {
  let auth = localStorage.token;
  return !auth?.length ? <Outlet /> : <Navigate to="/" element={<Home />} />;
};
