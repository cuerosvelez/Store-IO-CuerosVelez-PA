/* eslint-disable @typescript-eslint/no-explicit-any */
// import Footer from './components/footer';

import React, { lazy } from 'react';
import { LazyObserver } from './LazyObserver';

const CurrentPageComp = lazy(() => import('./components/current-page'));

const CurrentPage = (props: any) => (
  <LazyObserver
    skeleton={{
      width: 280,
      height: 50,
      margin: '40px auto',
    }}
  >
    <CurrentPageComp {...props} />
  </LazyObserver>
);

export default CurrentPage;
