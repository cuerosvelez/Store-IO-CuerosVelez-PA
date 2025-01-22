/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ProductGallery } from './components/pdp';

import React, { lazy, memo } from 'react';

import { LazyComponent } from './LazyObserver';
import Skeleton, { Skeletons } from './components/skeleton';

const ProductGalleryComp = lazy(() => import('./components/pdp/Gallery'));

const Ske = memo(() => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Skeletons
      size={4}
      height={80}
      width={53}
      margin={'15px 0'}
      direction="column"
      mob={{
        size: 0,
      }}
    />
    <Skeleton
      margin={'35px 0 0'}
      width={'calc(100% - 120px)'}
      height={'calc(100vh - 170px)'}
      mob={{ width: 'calc(100%)', height: '55vh', margin: '0' }}
    />
  </div>
));

Ske.displayName = 'Skeleton Product Gallery';
const ProductGallery = (props: any) => (
  <LazyComponent skeletonCustom={<Ske />}>
    <ProductGalleryComp {...props} />
  </LazyComponent>
);

export default ProductGallery;
