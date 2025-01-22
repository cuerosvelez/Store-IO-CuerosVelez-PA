/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { lazy } from 'react';

import { LazyComponent } from './LazyObserver';

const ProductSpecificationComp = lazy(
  () => import('./components/pdp/Specifications'),
);

const ProductSpecification = (props: any) => (
  <LazyComponent
    skeletons={{
      size: 3,
      width: '100%',
      height: '30px',
      margin: '10px 0',
      direction: 'column',
    }}
  >
    <ProductSpecificationComp {...props} />
  </LazyComponent>
);

export default ProductSpecification;
