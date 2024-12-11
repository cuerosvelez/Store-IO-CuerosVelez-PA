/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/css';

import { Icon } from 'vtex.store-icons';
import { Modal } from 'vtex.styleguide';
import { Overlay } from 'vtex.react-portal';
import { useCssHandles } from 'vtex.css-handles';
import { Block, Link } from 'vtex.render-runtime';

import styled from '../style/style.css';
import { useNavbar } from '../utils/NavBarContext';
import BtnSearch from '../common/BtnSearch';
import useDevice from 'vtex.device-detector/useDevice';

const CSS_HANDLES = [
  'linkLogin',
  'iconLogin',
  'loginPopUp',
  'loginOverlay',
  'backDropLogin',
  'containerLogin',
  'containerSearch',
  'iconLoginButton',
  'loginButtonModal',
  'containerMiniCart',
] as const;

interface INavRight {
  inicia?: string;
  rastrea?: string;
  factura?: string;
  linkRastrea?: string;
  linkFactura?: string;
}

const NavRight = ({
  linkRastrea = '#',
  linkFactura = '#',
  inicia = 'Inicia sesión',
  rastrea = 'Rastrea tu pedido',
  factura = 'Consulta tu factura',
}: INavRight) => {
  const [top, setTop] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isActiveLogin, setIsActiveLogin] = useState<boolean>(false);
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const refButton = useRef<HTMLButtonElement>(null);

  const { setIsColorHidden } = useNavbar();
  const { handles } = useCssHandles(CSS_HANDLES);
  const { isMobile } = useDevice();

  useEffect(() => {
    const ref = refButton.current;
    if (ref) {
      const sizes = ref.getBoundingClientRect();
      setTop(sizes?.top + sizes?.height + 3);
    }
  }, []);

  useEffect(() => {
    setIsColorHidden(isActiveLogin || isActiveSearch);
  }, [isActiveLogin, isActiveSearch, setIsColorHidden]);

  return (
    <>
      <Overlay>
        <div ref={modalRef} className={handles['loginOverlay']}>
          {isModalOpen}
        </div>
      </Overlay>
      {!isMobile && (
        <div
          className={`w-100 flex flex-row justify-end items-center ${
            handles['containerSearch']
          }${
            isActiveSearch ? ' ' + styled['containerSearch'] + '--active' : ''
          }`}
        >
          {isActiveSearch && <Block id="search-bar" />}
          <BtnSearch
            isActiveSearch={isActiveSearch}
            setIsActiveSearch={setIsActiveSearch}
          />
        </div>
      )}
      <div
        className={`flex flex-row items-center ${handles['containerMiniCart']}`}
      >
        <Block id="minicart.v2" />
      </div>
      <div
        className={`relative flex flex-row items-center ${
          isActiveLogin ? styled['containerLogin'] + '--active ' : ''
        }${handles['containerLogin']}`}
      >
        <button
          ref={refButton}
          onClick={() => {
            setIsActiveLogin((s) => !s);
          }}
          className={`relative bw0 pa0 pointer bg-transparent flex flex-row items-center ${handles['iconLoginButton']}`}
        >
          <Icon
            id="icon-login"
            isActive={true}
            activeClassName={handles['iconLogin']}
          />
        </button>
        {isActiveLogin && (
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              setIsActiveLogin(false);
            }}
            className={`fixed w-100 h-100 left-0 top-0 ${handles['backDropLogin']}`}
          />
        )}
        <div
          className={`fixed flex flex-column justify-center ${css({
            top,
          })} ${handles['loginPopUp']}`}
        >
          <button
            onClick={() => setIsModalOpen((s) => !s)}
            className={`c-on-base relative w-100 bw0 pa0 pointer bg-transparent ${handles['loginButtonModal']}`}
          >
            {inicia}
          </button>
          <Modal
            centered
            isOpen={isModalOpen}
            container={modalRef.current}
            onClose={() => setIsModalOpen(false)}
          >
            <Block id="login-content" />
          </Modal>
          <Link
            to={linkRastrea}
            className={`tc c-on-base ${handles['linkLogin']}`}
          >
            {rastrea}
          </Link>
          <Link
            to={linkFactura}
            className={`tc c-on-base ${handles['linkLogin']}`}
          >
            {factura}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavRight;
