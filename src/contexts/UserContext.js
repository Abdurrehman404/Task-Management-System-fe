import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();

export function useGlobalUser() {
  return useContext(UserContext);
}

function UserProvider({ children }) {
  const [globalUser, setGlobalUser] = useState({});

  useEffect(() => {
    let globalUserCookie = Cookies.get("globalUserCookie");
    if (
      globalUserCookie !== "undefined" &&
      globalUserCookie !== null &&
      globalUserCookie !== undefined
    ) {
      setGlobalUser(JSON.parse(globalUserCookie));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        globalUser,
        setGlobalUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
