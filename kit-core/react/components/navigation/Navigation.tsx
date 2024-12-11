import React, { memo } from 'react';
import { useDevice } from 'vtex.device-detector';
import { useCssHandles } from 'vtex.css-handles';

import NavigationContent from './NavigationContent';
import ContainerMobile from './ContainerMobile';

import type { INavigation } from '../types/navigation';

const CSS_HANDLES = [
  'menu',
  'menuIcon',
  'menuItem',
  'menuContent',
  'subMenuItem',
  'menuItemLink',
  'subMenuContent',
  'subMenuContainer',
] as const;

const Navigation = memo((props: INavigation) => {
  const { isMobile } = useDevice();
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <>
      {!isMobile ? (
        <NavigationContent {...props} handles={handles} />
      ) : (
        <ContainerMobile>
          <NavigationContent {...props} handles={handles} isMobile={isMobile} />
        </ContainerMobile>
      )}
    </>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
