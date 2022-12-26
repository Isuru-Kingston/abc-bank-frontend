import React, { useState } from "react";
import authContext from "./authContext";

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
}
