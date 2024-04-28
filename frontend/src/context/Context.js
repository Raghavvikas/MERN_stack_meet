import { createContext, useMemo, useState, useContext } from "react";
// import { reducer } from "../reducers/userReducers";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

const baseUrl = process.env.REACT_APP_BASE_URL;

export const AuthContextProvider = ({ ...children }) => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { Provider } = authContext;
  //   const [state, dispatch] = useReducer(reducer);

  const login = async (data) => {
    setUser(data);
    navigate("/");
  };
  const logout = () => {
    setUser();
    navigate("/", { replace: true });
  };
  //   const handleSignIn = async (user) => {
  //     if (result) {
  //       dispatch({
  //         type: "signIn",
  //         payload: { authenticated: true, user: result },
  //       });
  //     }
  //   };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default function AuthConsumer() {
  return useContext(authContext);
}
