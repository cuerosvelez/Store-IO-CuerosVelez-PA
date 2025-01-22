import React, { useState, useRef, useEffect, Suspense, ReactNode } from 'react';

import { NoSSR } from 'vtex.render-runtime';

import { SkeletonRenderer } from '../skeleton';

import type { SkeletonRendererProps } from '../skeleton';

interface LazyLoadOnViewProps extends SkeletonRendererProps {
  children: ReactNode;
}

const LazyObserverContent: React.FC<LazyLoadOnViewProps> = ({
  children,
  ...rest
}) => {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // setTimeout(() => setIsInView(true), 5000);
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {!isInView && <SkeletonRenderer ref={observerRef} {...rest} />}
      {isInView && (
        <Suspense fallback={<SkeletonRenderer {...rest} />}>
          {children}
        </Suspense>
      )}
    </>
  );
};

export const LazyObserver: React.FC<LazyLoadOnViewProps> = (props) => (
  <NoSSR>
    <LazyObserverContent {...props} />
  </NoSSR>
);

export const LazyComponent: React.FC<LazyLoadOnViewProps> = ({
  children,
  ...rest
}) => (
  <NoSSR>
    <Suspense fallback={<SkeletonRenderer {...rest} />}>
      {/* <SkeletonRenderer {...rest} /> */}
      {children}
    </Suspense>
  </NoSSR>
);

export default LazyObserver;
