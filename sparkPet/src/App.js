import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/home";
import ScrollToTop from "./common/scrollTop";
import Login from "./page/login";
import SignUp from "./page/signup";
import { GuestRoutes, PrivateRoute } from "./context/PrivateRoute";
import ForgetPassword from "./page/forget/Forget";
import ResetPassword from "./page/reset/Reset";
import Profile from "./page/Profile/profile";
import PetProfile from "./page/Pet-Profile/Pet-Profile";
import Feed from "./page/Feed/feed";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/get-profile/" element={<Profile />} />
          <Route exact path="/pet-profile/" element={<PetProfile />} />
          <Route exact path="/feed/" element={<Feed />} />
        </Route>
        <Route element={<GuestRoutes />}>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/forget-password" element={<ForgetPassword />} />
          <Route exact path="/reset-password/" element={<ResetPassword />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
