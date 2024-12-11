import React, { forwardRef, useMemo, memo } from 'react';

import '../style/global.css';
import {
  SkeletonProps,
  SkeletonsProps,
  SkeletonRendererProps,
} from '../types/skeleton';
import useIsMobile from '../hooks/useIsMobile';

export type { SkeletonProps, SkeletonsProps, SkeletonRendererProps };

export const Skeleton = memo(
  forwardRef<HTMLDivElement, SkeletonProps>(
    (
      { width = '100%', height = '1em', margin, borderRadius = 4, mob },
      ref,
    ) => {
      const { isMobile } = useIsMobile();

      const styles = useMemo(
        () => ({
          borderRadius,
          width,
          height,
          ...(margin ? { margin } : {}),
          ...(mob && isMobile ? { ...mob } : {}),
        }),
        [borderRadius, height, isMobile, margin, mob, width],
      );

      return <div ref={ref} className="skeleton" style={styles} />;
    },
  ),
);

export const Skeletons = memo(
  forwardRef<HTMLDivElement, SkeletonsProps>(({ mob = {}, ...restG }, ref) => {
    const { isMobile } = useIsMobile();
    const {
      spacing,
      size = 1,
      direction,
      ...rest
    } = useMemo(
      () => ({
        ...restG,
        ...(isMobile ? { ...mob } : {}),
      }),
      [isMobile, mob, restG],
    );

    const skeletonArray = useMemo(() => Array.from({ length: size }), [size]);

    if (!(skeletonArray?.length > 0)) return <></>;

    return (
      <div
        ref={ref}
        style={{
          display: 'grid',
          width: (rest?.width + '').includes('%') ? '100%' : 'fit-content',
          gap: spacing || undefined,
          ...(direction === 'row'
            ? { gridTemplateColumns: `repeat(${size}, 1fr)` }
            : { gridAutoFlow: 'row' }),
        }}
      >
        {skeletonArray.map((_, index) => (
          <Skeleton {...rest} key={index} />
        ))}
      </div>
    );
  }),
);

export const SkeletonRenderer = memo(
  forwardRef<HTMLDivElement, SkeletonRendererProps>(
    ({ skeleton, skeletons, skeletonCustom }, ref) =>
      skeletons ? (
        <Skeletons {...skeletons} ref={ref} />
      ) : skeleton ? (
        <Skeleton {...skeleton} ref={ref} />
      ) : skeletonCustom ? (
        <div ref={ref} style={{ width: '100%' }}>
          {skeletonCustom}
        </div>
      ) : (
        <Skeleton />
      ),
  ),
);

Skeleton.displayName = 'Skeleton';
Skeletons.displayName = 'Skeletons';
SkeletonRenderer.displayName = 'SkeletonRenderer';

export default Skeleton;
