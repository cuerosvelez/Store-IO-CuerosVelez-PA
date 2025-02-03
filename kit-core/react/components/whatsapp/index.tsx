import React, { useState } from 'react';
import { Icon } from 'vtex.store-icons';

import styled from '../style/style.css';
import { styleHeaders } from '../utils/styleSeo';
import { Link } from 'vtex.render-runtime';

const WhatsApp = ({
  items,
}: {
  items: Array<{
    link: string;
    title: string;
    text: string;
  }>;
}) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <section
      className={`flex flex-column items-end ${
        styled['whatsapp'] + 'Container'
      } ${
        styled['whatsapp'] +
        'Container' +
        '--' +
        (isActive ? 'visible' : 'hidden')
      }`}
    >
      <h4 style={styleHeaders}>Servicios vía WhatsApp</h4>
      <ul
        className={`list pl0 ma0 flex flex-colum items-center ${
          styled['whatsapp'] + 'Items'
        }`}
      >
        {items.map(({ link, title, text }, idx) => (
          <li
            key={`whatsapp-${link}--${idx}`}
            className={`w-100 ${styled['whatsapp'] + 'Item'}`}
          >
            <Link
              href={link}
              target="_blank"
              rel="noreferrer"
              className={`tr db ${styled['whatsapp'] + 'ItemLink'}`}
            >
              <h5 className={`ma0 ${styled['whatsapp'] + 'ItemTitle'}`}>
                {title}
              </h5>
              <h6 className={`ma0 ${styled['whatsapp'] + 'ItemText'}`}>
                {text}
              </h6>
            </Link>
          </li>
        ))}
      </ul>
      <button
        aria-label="whatsapp"
        onClick={() => setIsActive((s) => !s)}
        className={`db bw0 pa0 pointer bg-transparent flex flex-column items-center justify-center ${
          styled['whatsapp'] + 'Button'
        }`}
      >
        <Icon
          isActive={true}
          id="icon-whatsapp"
          activeClassName={`${styled['whatsapp'] + 'Icon'} ${
            styled['whatsapp'] + 'Icon--open'
          }`}
        />
        <Icon
          isActive={true}
          id="icon-close"
          activeClassName={`${styled['whatsapp'] + 'Icon'} ${
            styled['whatsapp'] + 'Icon--close'
          }`}
        />
      </button>
    </section>
  );
};

export default WhatsApp;
