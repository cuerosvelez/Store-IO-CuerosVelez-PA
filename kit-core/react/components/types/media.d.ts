/* eslint-disable @typescript-eslint/no-explicit-any */
import { MediaProps as MediaDefaultProps } from 'vtex.store-media';

export interface MediaProps extends MediaDefaultProps {
  image?: string;
  video?: string;
  textSeo: string;
  imageMobile?: string;
  mobileVideo?: string;
  mediaType?: 'image' | 'video';
}

export interface ButtonType {
  url: string;
  name: string;
  newTab?: boolean;
  colorSingle?: string;
}

export interface ButtonAdvancedSettings {
  width?: number;
  height?: number;
  spacing?: number;
  justify?: string;
  fontSize?: number;
  widthMobile?: number;
  heightMobile?: number;
  marginBottom?: number;
  borderRadius?: number;
  spacingMobile?: number;
  directionRow?: boolean;
  fontSizeMobile?: number;
  widthContainer?: number;
  marginBottomMobile?: number;
  leftWidthContainer?: boolean;
  colorSingle?: ButtonType['colorSingle'];
}

export interface ButtonProps {
  color?: string;
  classText?: string;
  buttons: ButtonType[];
  colorBackground?: string;
  listPositionMobile?: number;
  listPositionDesktop?: number;
  advancedSettings?: ButtonAdvancedSettings;
}

export interface ButtonStyleProps {
  colorSingle?: ButtonType['colorSingle'];
  colorBackground?: ButtonProps['colorBackground'];
  advancedSettings?: ButtonProps['advancedSettings'];
}

export interface ButtonContentType extends ButtonType {
  handles?: any;
  advancedSettings?: ButtonAdvancedSettings;
  colorBackground?: ButtonProps['colorBackground'];
}
