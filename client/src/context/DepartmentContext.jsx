import { createContext, useContext } from "react";

const DepartmentProvider = createContext();

export const DepartmentContext = ({ children }) => {
  
  return (
    <DepartmentProvider.Provider value={{}}>
      {children}
    </DepartmentProvider.Provider>
  );
};

export const useDepartment = () => {
  const context = useContext(DepartmentProvider);

  if (!context) throw Error("Accessing Outside Context");

  return context;
};
