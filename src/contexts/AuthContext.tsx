import React, { createContext, FC, useState } from "react";
import toast from "react-hot-toast";

interface AuthContextType {
  error: string;
  setError: (msg: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{children: React.ReactNode}> = ({children}) => {
  const [error, setError] = useState('');

  const showError = (message: string) => {
    setError(message);
    toast.error(message);
  };

  return (
    <AuthContext.Provider value={{error, setError: showError}}>
      {children}
    </AuthContext.Provider>
  )
}
