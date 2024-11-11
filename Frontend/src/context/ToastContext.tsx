import React, { createContext, useContext } from "react";
import { toast, ToastOptions, ToastPosition, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify styles

export interface ToastContextSetup {
  executeToast: (
    message: string,
    position: ToastPosition,
    hideProgressBar: boolean,
    options?: Partial<ToastOptions>
  ) => void;
}

export const ToastContext = createContext<ToastContextSetup>({} as any);

export const useExecuteToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useExecuteToast must be used within the ToastProvider.");
  }
  return context;
};

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const executeToast: ToastContextSetup["executeToast"] = (
    message,
    position,
    hideProgress,
    options = {}
  ) => {
    toast(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: hideProgress,
      ...options,
    });
  };

  return (
    <ToastContext.Provider value={{ executeToast }}>
      {children}
      <ToastContainer /> 
    </ToastContext.Provider>
  );
};
