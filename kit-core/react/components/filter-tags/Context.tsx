import React, { createContext, useContext, useState, useRef } from 'react';
import type { Dispatch, SetStateAction, RefObject, ReactNode } from 'react';
import { IActive } from './types/filterTags';

interface IItems {
  id?: string;
  label?: string;
  isHidden?: boolean;
}

interface ITags {
  category?: IItems[];
  department?: IItems[];
  subCategory?: IItems[];
}

interface FilterTagsContextType {
  items?: ITags;
  image?: string;
  active?: IActive;
  imageMobile?: string;
  RefBread: RefObject<HTMLDivElement>;
  setItems: Dispatch<SetStateAction<ITags | undefined>>;
  setActive: Dispatch<SetStateAction<IActive | undefined>>;
}

const FilterTagsContext = createContext<FilterTagsContextType | undefined>(
  undefined,
);

export const useFilterTagsContext = () => {
  const context = useContext(FilterTagsContext);
  if (!context) {
    throw new Error(
      'useFilterTagsContext debe ser usado dentro de un FilterTagsProvider',
    );
  }
  return context;
};

// Proveedor del contexto
export const FilterTagsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const RefBread = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ITags>();
  const [active, setActive] = useState<IActive>();

  return (
    <FilterTagsContext.Provider
      value={{
        items,
        active,
        setItems,
        setActive,
        RefBread,
      }}
    >
      {children}
    </FilterTagsContext.Provider>
  );
};
