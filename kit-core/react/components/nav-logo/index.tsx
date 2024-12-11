import React from 'react';

import { Link } from 'vtex.render-runtime';

import styled from '../style/style.css';

interface INavLogo {
  id: string;
  link: string;
  width: string;
  height: string;
  viewBox: string;
}

const NavLogo = ({
  link = '/',
  width = '167',
  height = '32',
  id = 'logo-vz',
  viewBox = '0 0 167 32',
}: INavLogo) => (
  <Link to={link} className={styled['navLogoVZ'] + 'Link'}>
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={styled['navLogoVZ'] + 'Box'}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <use href={`#${id}`} xlinkHref={`#${id}`} />
    </svg>
  </Link>
);

interface INavLogo {
  id: string;
  link: string;
  width: string;
  height: string;
  viewBox: string;
}

NavLogo.schema = {
  title: 'Nav Logo',
  type: 'object',
  properties: {
    id: {
      title: 'ID',
      type: 'string',
      description: 'ID From Icon Pack',
    },
    link: {
      title: 'Link',
      type: 'string',
      default: '/',
    },
    width: {
      title: 'Width',
      type: 'string',
      default: '16',
    },
    height: {
      title: 'Height',
      type: 'string',
      default: '16',
    },
    viewBox: {
      title: 'viewBox',
      type: 'string',
      default: '0 0 16 16',
    },
  },
};

export default NavLogo;
