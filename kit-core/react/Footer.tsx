/* eslint-disable @typescript-eslint/no-explicit-any */
// import Footer from './components/footer';

import React, { lazy, memo } from 'react';
import { LazyObserver } from './LazyObserver';
import { Skeleton, Skeletons } from './components/skeleton';

const FooterComp = lazy(() => import('./components/footer'));

const Ske = memo(() => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      marginBottom: 30,
      flexWrap: 'wrap',
      flexDirection: 'row',
    }}
  >
    <Skeleton
      width={0}
      height={0}
      mob={{ width: 'calc(100% - 30px', height: 97, margin: '20px auto' }}
    />
    <div style={{ width: 512.5, minWidth: '50%', maxWidth: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 15px',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Skeletons
          size={9}
          height={15}
          width={240}
          margin={'8px 10px'}
          direction="column"
          mob={{
            width: 130,
          }}
        />
        <Skeletons
          size={9}
          height={15}
          width={240}
          direction="column"
          margin={'5px 10px'}
          mob={{
            width: 130,
          }}
        />
        <Skeletons
          size={5}
          height={15}
          width={240}
          margin={'5px 10px'}
          direction="column"
          mob={{
            size: 0,
            width: 130,
          }}
        />
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        width: 512.5,
        minWidth: '50%',
        margin: '0 auto',
        alignItems: 'flex-end',
        flexDirection: 'column',
        maxWidth: 'calc(100% - 30px)',
        justifyContent: 'space-between',
      }}
    >
      <Skeleton
        height={60}
        width={500}
        margin={'5px 40px'}
        mob={{ width: 0, height: 0, margin: 0 }}
      />
      <Skeletons
        size={6}
        width={60}
        height={15}
        direction="row"
        margin={'5px 20px'}
        mob={{
          size: 4,
          width: '100%',
          margin: '75px auto',
        }}
      />
      <Skeletons
        size={6}
        width={30}
        height={30}
        direction="row"
        margin={'5px 16px'}
      />
    </div>
    <div style={{ width: 900, maxWidth: 'calc(100% - 30px)', marginLeft: 15 }}>
      <Skeleton
        height={30}
        width={'100%'}
        margin={'52px 0 0'}
        mob={{ height: 89 }}
      />
    </div>
  </div>
));

Ske.displayName = 'Skeleton Footer';
const Footer = (props: any) => (
  <LazyObserver skeletonCustom={<Ske />}>
    <FooterComp {...props} />
  </LazyObserver>
);

export default Footer;
