/* eslint-disable @typescript-eslint/no-explicit-any */
// import Navigation from './components/navigation';

import React, { lazy } from 'react';

import { LazyComponent } from './LazyObserver';

const NavigationComp = lazy(() => import('./components/navigation'));

const Navigation = (props: any) => (
  <LazyComponent
    skeletons={{
      size: 5,
      width: 63,
      height: 15,
      spacing: 40,
      direction: 'row',
      mob: {
        size: 2,
        width: 17,
        height: 20,
        spacing: 15,
      },
    }}
  >
    <NavigationComp {...props} />
  </LazyComponent>
);

export default Navigation;
