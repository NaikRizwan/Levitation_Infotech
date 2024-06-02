import React, { createContext, useContext, useReducer } from "react";

// Create a context to hold the user information
const UserContext = createContext();

// Define initial state for user
const initialState = {
  name: "",
  email: "",
  role: "",
  img: "",
  loggedIn: false,
};

// Reducer function to update user information
const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        img: action.payload.img,
        loggedIn: true,
      };
    case "CLEAR_USER":
      return {
        ...state,
        name: "",
        email: "",
        role: "",
        img: "",
        loggedIn: false,
      };
    default:
      return state;
  }
};

// Create a custom provider to manage the user state
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
