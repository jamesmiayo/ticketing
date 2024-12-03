import { createContext, useContext , useState } from "react";

export const PermissionContext = createContext<any>(null);

export const PermissionProvider = ({ children }: any) => {
  const [permission, setPermission] = useState<any>(
    JSON.parse(localStorage.getItem("permissions") || "[]")
  );

  return (
    <PermissionContext.Provider value={{ permission, setPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => useContext(PermissionContext);
