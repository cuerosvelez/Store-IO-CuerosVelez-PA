/* eslint-disable no-console */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { ReactNode } from 'react';

import { Block } from 'vtex.render-runtime';
import { Overlay } from 'vtex.react-portal';
import { useCssHandles } from 'vtex.css-handles';

import { css } from '@emotion/css';

import styled from '../style/style.css';
import { NavbarProvider, useNavbar } from '../utils/NavBarContext';
import { styleHeaders } from '../utils/styleSeo';
import { useDevice } from 'vtex.device-detector';

interface INavBar {
  style?: string;
  children?: ReactNode;
}

const CSS_HANDLES = [
  'header',
  'headerNav',
  'headerRow',
  'headerBand',
  'headerContent',
  'headerColLeft',
  'headerColRight',
  'headerColCenter',
] as const;

const NavBar = ({ style = 'white', children }: INavBar) => {
  const [width, setWidth] = useState<number>(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // const [navHeight, setNavHeight] = useState<number>(0);
  //  ${css({
  //         minHeight: navHeight,
  //       })}

  const navRef = useRef<HTMLElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  const { isColorHidden } = useNavbar();
  const { handles } = useCssHandles(CSS_HANDLES);

  const mWidth = useMemo(
    () =>
      css({
        maxWidth: `calc(100% - ${width / 2}px)`,
      }),
    [width],
  );

  const handleScroll = useCallback(() => {
    if (headerRef.current) {
      const offset = headerRef.current.offsetTop;
      const scrollPosition = window.scrollY;

      setIsSticky(scrollPosition > offset);
    }
  }, [headerRef]);

  useEffect(() => {
    const handleVisibilityChange = (event: CustomEvent) => {
      setIsVisible(event.detail.isVisible);
    };

    window.addEventListener(
      'visibilityChange',
      handleVisibilityChange as EventListener,
    );

    return () =>
      window.removeEventListener(
        'visibilityChange',
        handleVisibilityChange as EventListener,
      );
  }, []);

  useEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current?.getBoundingClientRect()?.width ?? 0);
    }
    // if (navRef.current) {
    //   setNavHeight(navRef.current?.offsetHeight); // Guardar la altura en el estado
    // }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [style, handleScroll]);

  const { isMobile } = useDevice();

  return (
    <>
      <header
        ref={headerRef}
        className={`w-100 ${styled['header'] + '--' + style} ${
          isSticky ? styled['header'] + '--sticky ' : ''
        }${handles['header']}${
          isColorHidden ? ' ' + styled['header'] + '--colorEffectHidden' : ''
        }`}
      >
        <nav
          ref={navRef}
          className={`z-9999 w-100 flex flex-column ${handles['headerNav']}`}
        >
          <h2 style={styleHeaders}>menu de navegación</h2>
          <div className={`w-100 ${handles['headerBand']}`}>
            <Block id="head-band" />
          </div>
          <div className={`w-100 relative ${handles['headerContent']}`}>
            <div
              className={`w-100 flex flex-row justify-between items-center relative ${
                isMobile ? styled['menuMobile'] + ' ' : ''
              } ${handles['headerRow']}`}
            >
              <div className={`${mWidth} ${handles['headerColLeft']}`}>
                <Block id="navigation" />
              </div>
              <div
                ref={divRef}
                className={`flex flex-column relative ${handles['headerColCenter']}`}
              >
                <h1 style={styleHeaders}>VÉLEZ</h1>
                <Block id="nav-logo" />
              </div>
              <div
                className={`relative flex flex-row justify-end ${mWidth} ${handles['headerColRight']}`}
              >
                <Block id="nav-right" />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Overlay>
        <div className={isVisible ? 'btnWpNoScroll' : styled['btnWpScroll']}>
          {children}
        </div>
      </Overlay>
    </>
  );
};

const NavbarContext = (props: INavBar) => (
  <NavbarProvider>
    <NavBar {...props} />
  </NavbarProvider>
);

NavbarContext.schema = {
  title: 'Nav Bar',
  type: 'object',
  properties: {
    style: {
      type: 'string',
      default: 'white',
      title: 'Type Menu',
      enum: ['white', 'transparent'],
      enumNames: ['White', 'Transparent', 'FLYUP'],
    },
  },
};

export default NavbarContext;
