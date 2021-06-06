import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/authReducer";

export const AuthContext = createContext();

const prevState = JSON.parse(localStorage.getItem("state"));
const initialState = prevState
  ? { user: prevState.user, isDarkMode: prevState.isDarkMode }
  : { user: null, isDarkMode: false };

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log(state);

  useEffect(() => {
    if (document.cookie.includes("check=")) {
      localStorage.setItem("state", JSON.stringify(state));
    } else {
      localStorage.removeItem("state");
    }
  }, [state]);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
