import React from 'react';
import { Block } from 'vtex.render-runtime';

import styled from '../style/style.css';

import type { ReactNode } from 'react';

interface IModalMobile {
  classes?: string;
  isActive: boolean;
  children?: ReactNode;
  setIsActive: (value: React.SetStateAction<boolean>) => void;
}

const ModalMobile = ({
  isActive,
  setIsActive,
  classes,
  children,
}: IModalMobile) => (
  <div
    className={`vtex-modal__overlay ${styled['menuMobile'] + 'Container'} ${
      classes ? styled['menuMobile'] + 'Container--' + classes + ' ' : ''
    }${
      styled['menuMobile'] + 'Container--' + (isActive ? 'visible' : 'hidden')
    }`}
  >
    <div
      className={`vtex-modal__modal br2 w-100 flex flex-column ${
        styled['menuMobile'] + 'Content'
      }`}
    >
      <div
        className={`flex justify-content relative ${
          styled['menuMobile'] + 'Header'
        }`}
      >
        <Block id="nav-logo" />
        <Block id="search-bar" />
        <button
          onClick={() => setIsActive(false)}
          className="pa0 pointer bn bg-transparent absolute pointer ml-auto items-center flex vtex-modal__close-icon"
        >
          <svg
            className="vtex__icon-close"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g fill="currentColor">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </g>
          </svg>
        </button>
      </div>
      {!!children && (
        <div
          className={`overflow-auto flex-shrink-1 flex-grow-1 ${
            styled['menuMobile'] + 'SectionMenu'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  </div>
);

export default ModalMobile;
