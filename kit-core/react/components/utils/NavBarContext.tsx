import React, { createContext, useContext, useState } from 'react';

import type { ReactNode, Dispatch, SetStateAction } from 'react';

// Definir el tipo de los datos que el contexto va a compartir
interface NavbarContextType {
  isColorHidden: boolean;
  setIsColorHidden: Dispatch<SetStateAction<boolean>>;
}

// Crear el contexto con un valor por defecto
const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

// Crear un proveedor para el contexto
export const NavbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isColorHidden, setIsColorHidden] = useState(false);

  return (
    <NavbarContext.Provider value={{ isColorHidden, setIsColorHidden }}>
      {children}
    </NavbarContext.Provider>
  );
};

// Hook personalizado para usar el contexto de forma segura
export const useNavbar = (): NavbarContextType => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar debe ser usado dentro de un NavbarProvider');
  }
  return context;
};
