import type { PropsWithChildren, ReactNode } from 'react';
import type {
  SliderLayoutProps,
  SliderLayoutSiteEditorProps,
} from 'vtex.slider-layout';

interface IItemsBand {
  href?: string;
  text?: string;
  target?: boolean;
}

export interface HeadBandProps {
  colorText: string;
  blockClass?: string;
  children: ReactNode;
  colorBackground: string;
  contentItem: IItemsBand[];
  sliderProps: PropsWithChildren<
    (SliderLayoutProps & SliderLayoutSiteEditorProps) | undefined
  >;
}
