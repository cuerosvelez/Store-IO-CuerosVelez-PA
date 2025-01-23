/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import styles from './styles.css';

export const KeepingBuying = () => {
  return (
    <a
      onClick={(e) => e.preventDefault()}
      className={`${styles['keeping-buying']} velez-common-keepingBuying`}
    >
      SEGUIR COMPRANDO
    </a>
  );
};
