/* eslint-disable @typescript-eslint/no-explicit-any */
// import HeadBand from './components/head-band';

import React, { lazy } from 'react';
import { LazyComponent } from './LazyObserver';

const HeadBandComp = lazy(() => import('./components/head-band'));

const HeadBand = (props: any) => (
  <LazyComponent
    skeleton={{
      height: 38,
    }}
  >
    <HeadBandComp {...props} />
  </LazyComponent>
);

export default HeadBand;
