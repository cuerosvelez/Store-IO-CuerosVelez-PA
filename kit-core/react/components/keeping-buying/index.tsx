import React from 'react';

import styles from '../style/style.css';

export const KeepingBuying = () => {
  return (
    <button
      aria-label="Seguir comprando"
      onClick={(e) => e.preventDefault()}
      className={`${styles['keeping']}Buying`}
    >
      SEGUIR COMPRANDO
    </button>
  );
};
