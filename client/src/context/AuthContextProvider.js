import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/authReducer";
import axios from "axios";

export const AuthContext = createContext();

const prevState = JSON.parse(localStorage.getItem("state"));
const initialState = prevState
  ? { user: prevState.user, isDarkMode: prevState.isDarkMode }
  : { user: null, notes: [], isDarkMode: false };

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log(state);

  const handleDelete = async (id) => {
    await axios.delete(`/notes/${id}`);

    const newNotes = state.notes.filter((note) => note._id !== id);
    dispatch({ type: "SET_NOTES", payload: newNotes });
  };

  useEffect(() => {
    if (document.cookie.includes("check=")) {
      localStorage.setItem("state", JSON.stringify(state));
    } else {
      localStorage.removeItem("state");
    }
  }, [state]);

  return <AuthContext.Provider value={{ ...state, handleDelete, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
