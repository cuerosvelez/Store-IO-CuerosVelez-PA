/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* Typings for `render-runtime` */
declare module 'vtex.render-runtime' {
  import { Component, ReactElement } from 'react';

  export const useRuntime: any;
  export const lazy: any;

  export interface NavigationOptions {
    page: string;
    params?: any;
  }
  export interface RenderContextProps {
    runtime: {
      navigate: (options: NavigationOptions) => void;
    };
  }

  export const useChildBlock = ({ id }: { id: any }) => any as any;

  export const Helmet: ComponentType<any>;
  export const Link: ComponentType<any>;
  export const Block: ComponentType<any>;
  export const NoSSR: ComponentType<any>;
  export const ExtensionPoint: ReactElement;
  export const RenderContextConsumer: ReactElement;
  export const canUseDOM: boolean;
  export const withRuntimeContext: <TOriginalProps extends object>(
    Component: ComponentType<TOriginalProps & RenderContextProps>,
  ) => ComponentType<TOriginalProps>;

  export const withSession: <TOriginalProps extends object>(
    Component: ComponentType<TOriginalProps & RenderContextProps>,
  ) => ComponentType<TOriginalProps>;

  export const buildCacheLocator = (
    app: string,
    type: string,
    cacheId: string,
  ) => string;

  interface RenderComponent<P = object, S = object> extends Component<P, S> {
    getCustomMessages?: (locale: string) => any;
    schema: ComponentSchema;
    getSchema?: (a: any, b: any?) => ComponentSchema;
    uiSchema: UISchema;
  }

  export interface ComponentsRegistry {
    [component: string]: RenderComponent<any, any>;
  }

  export interface Window extends Window {
    __RENDER_7_COMPONENTS__: ComponentsRegistry;
  }

  let global: Window;
}
