import React, { useRef, useState } from 'react';

import { useCssHandles } from 'vtex.css-handles';
import { Block, NoSSR } from 'vtex.render-runtime';
import { Overlay } from 'vtex.react-portal';
import { Modal } from 'vtex.styleguide';
import { useDevice } from 'vtex.device-detector';
import { Icon } from 'vtex.store-icons';

const CSS_HANDLES = ['modalFilter', 'buttonFilter', 'iconFilter'] as const;
const Filter = ({ iconId = 'icon-filter' }: { iconId: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { handles } = useCssHandles(CSS_HANDLES);

  const modalRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useDevice();

  return (
    <>
      <NoSSR>
        <button
          aria-label="Filtrar productos"
          className={`w0 pa0 pointer bn bg-transparent c-on-base ${handles['buttonFilter']}`}
          onClick={() => setOpen((s) => !s)}
        >
          {!isMobile ? (
            'Filtrar'
          ) : (
            <Icon
              id={iconId}
              isActive={true}
              activeClassName={handles['iconFilter']}
            />
          )}
        </button>
        <Overlay>
          <div ref={modalRef} className={handles.modalFilter} />
        </Overlay>
        {modalRef?.current && (
          <Modal
            centered
            isOpen={open}
            onClose={() => setOpen(false)}
            container={modalRef?.current}
          >
            <Block id="filter-navigator.v3" />
          </Modal>
        )}
      </NoSSR>
    </>
  );
};

export default Filter;
