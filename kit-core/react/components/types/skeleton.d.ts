import type { ReactElement, CSSProperties } from 'react';

export interface SkeletonBaseProps {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  margin?: CSSProperties['margin'];
  borderRadius?: CSSProperties['borderRadius'];
}
export interface SkeletonProps extends SkeletonBaseProps {
  mob?: SkeletonBaseProps;
}

export interface SkeletonsBaseProps {
  size?: number;
  direction?: 'row' | 'column';
  spacing?: CSSProperties['gap'];
}

export interface SkeletonsProps extends SkeletonsBaseProps, SkeletonBaseProps {
  mob?: SkeletonsBaseProps & SkeletonBaseProps;
}

export interface SkeletonRendererProps {
  skeletonCustom?: ReactElement;
  skeleton?: SkeletonProps;
  skeletons?: SkeletonsProps;
}
