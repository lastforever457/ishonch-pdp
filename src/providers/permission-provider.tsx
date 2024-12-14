import React, { createContext, useContext, ReactNode } from "react";

// Ruxsatlar uchun typelar
interface PermissionsProviderProps {
  permissions: string[];
  children: ReactNode;
}

interface PermissionsContextValue {
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
}

// Kontekstni yaratish
const PermissionsContext = createContext<PermissionsContextValue | undefined>(
  undefined
);

// Provider komponenti
export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({
  permissions,
  children,
}) => {
  const hasPermission = (permission: string) =>
    permissions.includes(permission);

  const hasAnyPermission = (permissionsToCheck: string[]) =>
    permissionsToCheck.some((permission) => permissions.includes(permission));

  return (
    <PermissionsContext.Provider value={{ hasPermission, hasAnyPermission }}>
      {children}
    </PermissionsContext.Provider>
  );
};

// Custom hook
export const usePermissions = (): PermissionsContextValue => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
};
