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
  colorSingle?: string;
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
}

export interface ButtonProps {
  text?: string;
  color?: string;
  active: boolean;
  classText?: string;
  buttons: ButtonType[];
  colorBackground?: string;
  listPositionMobile?: number;
  listPositionDesktop?: number;
  advancedSettings?: ButtonAdvancedSettings;
}
