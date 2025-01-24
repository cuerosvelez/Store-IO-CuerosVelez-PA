/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy } from 'react';

import { LazyObserver } from './LazyObserver';

const ProductColorComp = lazy(
  () => import('./components/product-image-slider'),
);

const ProductImageSlider = (props: any) => (
  <LazyObserver
    skeleton={{
      width: '100%',
      height: '100%',
    }}
  >
    <ProductColorComp {...props} />
  </LazyObserver>
);

// import ProductImageSlider from './components/product-image-slider';

export default ProductImageSlider;
