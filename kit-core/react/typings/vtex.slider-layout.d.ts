declare module 'vtex.slider-layout' {
  import type { ComponentType } from 'react';
  export interface SliderLayoutSiteEditorProps {
    infinite?: boolean;
    showNavigationArrows?: 'mobileOnly' | 'desktopOnly' | 'always' | 'never';
    showPaginationDots?: 'mobileOnly' | 'desktopOnly' | 'always' | 'never';
    usePagination?: boolean;
    fullWidth?: boolean;
    arrowSize?: ResponsiveValuesTypes.ResponsiveValue<number>;
  }

  export interface SliderLayoutProps {
    totalItems?: number;
    label: string;
    slideTransition?: {
      /** Transition speed in ms */
      speed: number;
      /** Transition delay in ms */
      delay: number;
      timing: string;
    };
    autoplay?: {
      /** Timeout duration in ms */
      timeout: number;
      stopOnHover: boolean;
    };
    navigationStep: number | 'page';
    itemsPerPage?: ResponsiveValuesTypes.ResponsiveValue<number>;
    centerMode: ResponsiveValuesTypes.ResponsiveValue<
      'center' | 'to-the-left' | 'disabled'
    >;
    centerModeSlidesGap?: number;
  }

  export const SliderLayout: ComponentType<
    PropsWithChildren<SliderLayoutProps & SliderLayoutSiteEditorProps>
  >;
}
