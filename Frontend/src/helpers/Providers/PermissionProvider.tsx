import { createContext, useState } from "react";

export const PermissionContext = createContext(null);

export const PermissionProvider = ({ children }:any) => {
  const [permission, setPermission] = useState<string[]>(
    JSON.parse(localStorage.getItem("permissions") || 'null') 
  );

  return (
    <PermissionContext.Provider value={{ permission, setPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};
