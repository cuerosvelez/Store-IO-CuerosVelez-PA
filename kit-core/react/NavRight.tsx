/* eslint-disable @typescript-eslint/no-explicit-any */
// import NavRight from './components/nav-right';

import React, { lazy } from 'react';
import { LazyComponent } from './LazyObserver';

const NavRightComp = lazy(() => import('./components/nav-right'));

const NavRight = (props: any) => (
  <LazyComponent
    skeletons={{
      size: 3,
      width: 17,
      height: 17,
      spacing: 24,
      direction: 'row',
    }}
  >
    <NavRightComp {...props} />
  </LazyComponent>
);

export default NavRight;
