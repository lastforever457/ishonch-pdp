import React, { createContext, useContext, useState } from "react";
import api from "../utils/axios";

interface AuthContextType {
  accessToken: string | null;
  user: Record<string, any> | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<Record<string, any> | null>(
    null
  );

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    const user = await api.post("/users/findUnique", {
      where: { email },
    });
    setAccessToken(response.data.accessToken);
    setCurrentUser(user.data);
  };

  const logout = () => {
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user: currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
