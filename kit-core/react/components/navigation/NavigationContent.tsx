/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SubItem from './SubItem';

import type { INavigation, ISubItem } from '../types/navigation';

const NavigationContent = ({
  menuItems = [],
  handles,
  isMobile,
}: INavigation & { handles: any; isMobile?: boolean }) => {
  return (
    <ul
      className={`list pl0 flex flex-row ma0 items-center ${handles['menu']}`}
    >
      {menuItems?.map((menuItem: ISubItem) => (
        <SubItem
          level={1}
          {...menuItem}
          handles={handles}
          key={`${menuItem?.title}-1`}
          paramsKeys={`${menuItem?.title}`}
          isMobile={isMobile}
        />
      ))}
    </ul>
  );
};

export default NavigationContent;
