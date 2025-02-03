import React, { ReactChildren, useState } from 'react';
import styled from '../style/style.css';
import { styleHeaders } from '../utils/styleSeo';

const ContainerReviews = ({ children }: { children: ReactChildren }) => {
  const [state, setState] = useState(false);
  return (
    <section
      className={`${styled['reviews'] + 'Container'} ${
        styled['reviews'] + (state ? 'Put' : 'View')
      }`}
    >
      <h2 style={styleHeaders}>Reseñas</h2>
      <div className={`${styled['reviews'] + 'Buttons'}`}>
        <button
          aria-label="Dejar reseña"
          onClick={() => setState(true)}
          className={`${styled['reviews'] + 'Button'}${
            state ? ' ' + styled['reviews'] + 'Active' : ''
          }`}
        >
          <h3 className={`${styled['reviews'] + 'Title'}`}>Dejar reseña</h3>
        </button>
        <button
          aria-label="Ver reseñas"
          onClick={() => setState(false)}
          className={`${styled['reviews'] + 'Button'}${
            !state ? ' ' + styled['reviews'] + 'Active' : ''
          }`}
        >
          <h3 className={`${styled['reviews'] + 'Title'}`}>Ver reseñas</h3>
        </button>
      </div>
      {children}
    </section>
  );
};

export default ContainerReviews;
