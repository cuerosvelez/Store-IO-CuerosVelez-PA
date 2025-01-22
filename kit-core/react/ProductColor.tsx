/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { lazy } from 'react';

import { LazyComponent } from './LazyObserver';

const ProductColorComp = lazy(() => import('./components/pdp/Color'));

const ProductColor = (props: any) => (
  <LazyComponent
    skeletons={{
      size: 4,
      width: 24,
      height: 24,
      spacing: 24,
      margin: '10px 0',
      direction: 'row',
    }}
  >
    <ProductColorComp {...props} />
  </LazyComponent>
);

export default ProductColor;

// import { ProductColor } from './components/pdp';

// export default ProductColor;
