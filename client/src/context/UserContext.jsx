import { createContext, useContext, useEffect, useState } from "react";

const UserProvider = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const setLocalStorage = (token, user) => {
    const { _id, role, fullname, email } = user;
    const data = {
      token,
      _id,
      role,
      name:fullname,
      email,
    };

    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    getLocalStorage();
  }, []);
  
  return (
    <UserProvider.Provider value={{ user, setLocalStorage, clearLocalStorage }}>
      {children}
    </UserProvider.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserProvider);
  if (!context) throw Error("Accessing Data Outside Context");

  return context;
};
