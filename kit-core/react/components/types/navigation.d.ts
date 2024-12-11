/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISubItem {
  handles?: any;
  level?: number;
  title?: string;
  style?: string;
  isMobile?: boolean;
  paramsKeys?: string;
  href?: string | null;
  subItems?: ISubItem[];
  __editorItemTitle?: string;
}

export interface INavigation {
  handles?: any;
  isMobile?: boolean;
  menuItems: ISubItem[];
}
