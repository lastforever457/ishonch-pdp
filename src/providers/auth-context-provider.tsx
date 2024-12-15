import React, { createContext, useContext, useMemo } from "react";

interface AuthContextType {
  user: Record<string, any> | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentUser = useMemo(() => {
    return {
      firstName: "Steve",
      lastName: "Jobs",
      email: "WlA9I@example.com",
      role: "ADMIN",
      status: "ACTIVE",
      image:
        "https://www.anonimacinefili.it/wp-content/uploads/2024/03/Oppenheimer-film-Nolan-spiegazione-significato-finale-recensione-4.jpg",
      phone: "+998 99 999 99 99",
      birthDate: "2000-01-01",
      male: "MALE",
      id: 1,
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
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
