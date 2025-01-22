import React, { ReactChildren, useState } from 'react';
import styled from '../style/style.css';

const ContainerReviews = ({ children }: { children: ReactChildren }) => {
  const [state, setState] = useState(false);
  return (
    <div
      className={`${styled['reviews'] + 'Container'} ${
        styled['reviews'] + (state ? 'Put' : 'View')
      }`}
    >
      <div className={`${styled['reviews'] + 'Buttons'}`}>
        <button
          onClick={() => setState(true)}
          className={`${styled['reviews'] + 'Button'}${
            state ? ' ' + styled['reviews'] + 'Active' : ''
          }`}
        >
          Dejar reseña
        </button>
        <button
          onClick={() => setState(false)}
          className={`${styled['reviews'] + 'Button'}${
            !state ? ' ' + styled['reviews'] + 'Active' : ''
          }`}
        >
          Ver reseñas
        </button>
      </div>
      {children}
    </div>
  );
};

export default ContainerReviews;
