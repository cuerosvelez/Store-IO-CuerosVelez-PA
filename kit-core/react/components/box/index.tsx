/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode, CSSProperties } from 'react';
import React from 'react';
import { useDevice } from 'vtex.device-detector';
// import type { CssHandlesTypes } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles';
import { useCssHandles } from 'vtex.css-handles';

// import './styles.css';

const CSS_HANDLES = ['box'] as const;

export type BoxProps = {
  children?: ReactNode;
  /**
   * ¿Qué etiqueta HTML quieres usar?
   *
   * @default div
   */
  tag?: keyof React.ReactHTML;
  /**
   * Clases de CSS adicionales que deseas agregar.
   * Hecho para usar con clases de taquiones
   */
  /**
   * Si desea utilizar este componente
   * para agregar texto simple
   */
  text?: string;
  isMobile?: boolean;
  isDesktop?: boolean;
  style?: CSSProperties;
  styleDesktop?: CSSProperties;
  onClick?: (event: any) => void;
  Ref?: React.RefObject<any>;
  styleMobile?: CSSProperties;
  custom?: string | [string];
  customMobile?: string | [string];
  customDesktop?: string | [string];
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>;
};

const Box = ({
  Ref,
  text,
  style,
  custom,
  classes,
  onClick,
  children,
  styleMobile,
  tag = 'div',
  styleDesktop,
  customMobile,
  customDesktop,
  isMobile: conditionMobile = true,
  isDesktop: conditionDesktop = true,
}: BoxProps) => {
  const { isMobile } = useDevice();
  const { handles } = useCssHandles(CSS_HANDLES, {
    migrationFrom: ['vtex.store-components@3.x'],
    classes,
  });

  // condicional para ocultar en mobile o en desktop
  if ((isMobile && !conditionMobile) || (!isMobile && !conditionDesktop)) {
    return <></>;
  }

  const validateClass = (clases: string | [string] | undefined) => {
    if (typeof clases === 'string') {
      return clases.replace(/[^a-zA-Z0-9-]/g, '');
    }

    if (Array.isArray(clases)) {
      const clear = clases.map((clas) => clas.replace(/[^a-zA-Z0-9-]/g, ''));

      return clear.join(' ');
    }

    return '';
  };

  const styled = (style: { [key: string]: any }) =>
    Object.keys(style)
      .filter((propiedad) => CSS.supports(propiedad, style[propiedad]))
      .reduce((obj: any, propiedad) => {
        obj[propiedad] = style[propiedad];
        return obj;
      }, {});

  const props: any = {
    className: `${custom ? `${validateClass(custom)} ` : ''}${
      customMobile && isMobile ? `${validateClass(customMobile)} ` : ''
    }${customDesktop && !isMobile ? `${validateClass(customDesktop)} ` : ''}${
      handles?.box ?? ''
    }`,
    style: {
      ...(style ? styled(style) : {}),
      ...(isMobile && styleMobile ? styled(styleMobile) : {}),
      ...(!isMobile && styleDesktop ? styled(styleDesktop) : {}),
    },
  };

  if (typeof onClick === 'function') {
    props.onClick = onClick;
  }

  if (Ref) {
    props.ref = Ref;
  }

  const Children = (
    <>
      {children}
      {text}
    </>
  );

  const Element = React.createElement(tag, props, Children);

  // ¡¡¡No tienes que hacerlo por clase porque la clase se controla en el tema de la tienda!!!

  return <>{Element}</>;
};

Box.schema = {
  title: 'Box Group',
  type: 'object',
  properties: {
    text: {
      title: 'Box text',
      type: 'string',
      default: 'Lorem Ipsum',
    },
    tag: {
      title: 'Box tag',
      type: 'string',
      default: 'div',
    },
  },
};

export default Box;
