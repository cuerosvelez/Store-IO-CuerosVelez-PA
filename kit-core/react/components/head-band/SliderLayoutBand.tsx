import React from 'react';
import { SliderLayout } from 'vtex.slider-layout';

import type { HeadBandProps } from './types.d';

const SliderLayoutBand = ({
  children,
  ...rest
}: HeadBandProps['sliderProps']) => (
  <SliderLayout {...rest}>{children}</SliderLayout>
);

SliderLayoutBand.schema = {
  type: 'object',
  properties: {
    infinite: {
      default: true,
      type: 'boolean',
      title: 'admin/editor.slider-layout.infinite',
    },
    showNavigationArrows: {
      default: 'always',
      enum: ['mobileOnly', 'desktopOnly', 'always', 'never'],
      enumNames: [
        'admin/editor.slider-layout.sliderNavigationAndPaginationPropertyMobileOnly',
        'admin/editor.slider-layout.sliderNavigationAndPaginationPropertyDesktopOnly',
        'admin/editor.slider-layout.sliderNavigationAndPaginationPropertyAlways',
        'admin/editor.slider-layout.sliderNavigationAndPaginationPropertyNever',
      ],
      title: 'admin/editor.slider-layout.showNavigation',
      type: 'string',
    },
    showPaginationDots: {
      default: 'always',
      enum: ['mobileOnly', 'desktopOnly', 'always', 'never'],
      enumNames: [
        'admin/editor.slider-layout.sliderNavigationAndPaginationPropertyMobileOnly',
        'admin/editor.slider-layout.sliderNavigationAndPaginationPropertyDesktopOnly',
        'admin/editor.slider-layout.sliderNavigationAndPaginationPropertyAlways',
        'admin/editor.slider-layout.sliderNavigationAndPaginationPropertyNever',
      ],
      title: 'admin/editor.slider-layout.showPaginationDots',
      type: 'string',
    },
    usePagination: {
      default: true,
      title: 'admin/editor.slider-layout.usePagination',
      type: 'boolean',
    },
    fullWidth: {
      default: true,
      title: 'admin/editor.slider-layout.sliderFullWidth',
      description: 'admin/editor.slider-layout.sliderFullWidthDescription',
      type: 'boolean',
    },
  },
};

export default SliderLayoutBand;
