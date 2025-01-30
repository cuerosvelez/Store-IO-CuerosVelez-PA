/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, memo } from 'react';
import LazyObserver from './LazyObserver';
import Skeleton, { Skeletons } from './components/skeleton';
import React from 'react';

const CompCustomMinicartProductList = lazy(
  () => import('./components/custom-minicart-product-list'),
);

const Ske = memo(() => (
  <div
    style={{
      width: '90%',
      margin: '15px auto',
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    <Skeleton
      width={115}
      height={170}
      //   mob={{ width: 'calc(100% - 30px', height: 97, margin: '20px auto' }}
    />
    <Skeletons
      size={6}
      height={15}
      width={'100%'}
      margin={'8px 10px 0 10px'}
      direction="column"
      //   mob={{
      //     width: 130,
      //   }}
    />
  </div>
));
Ske.displayName = 'Skeleton CustomMinicartProductList';
const CustomMinicartProductList = (props: any) => (
  <LazyObserver
    skeletonCustom={
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Ske />
        <Ske />
      </div>
    }
  >
    <CompCustomMinicartProductList {...props} />
  </LazyObserver>
);

// import { CustomMinicartProductList } from './components/custom-minicart-product-list';

export default CustomMinicartProductList;
