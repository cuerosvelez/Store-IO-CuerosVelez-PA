import React, { useState } from 'react';
import { Icon } from 'vtex.store-icons';
import ModalMobile from './ModalMobile';
import BtnSearch from '../common/BtnSearch';
import styled from '../style/style.css';

interface ContainerMobileProps {
  children?: React.ReactNode;
}

const ContainerMobile = ({ children }: ContainerMobileProps) => {
  const [isMenu, setIsMenu] = useState(false);
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  return (
    <>
      <button
        className={`pa0 pointer bn bg-transparent ${
          styled['buttonIcon'] + 'Search'
        }`}
        aria-label="Menu hamburguesa"
        onClick={() => setIsMenu((s) => !s)}
      >
        <Icon
          isActive={true}
          id={'icon-burger'}
          activeClassName={styled['icon'] + 'Burger'}
        />
      </button>
      <ModalMobile isActive={isMenu} setIsActive={setIsMenu}>
        {children}
      </ModalMobile>
      <BtnSearch
        isActiveSearch={isActiveSearch}
        setIsActiveSearch={setIsActiveSearch}
      />
      {isActiveSearch && (
        <ModalMobile
          classes="modal-search"
          isActive={isActiveSearch}
          setIsActive={setIsActiveSearch}
        />
      )}
    </>
  );
};

export default ContainerMobile;
