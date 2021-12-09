import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

var INITIAL_STATE={}


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
     INITIAL_STATE = {
      user:JSON.parse(localStorage.getItem("user")) || null,
      isFetching: false,
      error: false,
    };

  })
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
