import React from 'react';
import useFormatPrice from '../hooks/useFormatPrice';

import { SummaryInstallments } from './SummaryInstallments';
import type { InstallmentOptionsProps } from './SummaryInstallments';

import styles from './styles.css';

interface SummaryItemProps {
  id: string;
  value: number;
  showInstallments?: boolean;
  installments?: InstallmentOptionsProps[];
}

const TranslateNamesTotalizer = (id: string): string => {
  switch (id) {
    case 'Items':
      return 'Subtotal';

    case 'Shipping':
      return 'Frete';

    case 'Total':
      return 'Total';

    case 'Discounts':
      return 'Descontos';

    case 'Tax':
      return 'Taxas';

    default:
      return 'Valor';
  }
};

export const SummaryItem = ({
  id,
  value,
  showInstallments,
  installments,
}: SummaryItemProps) => {
  const { formatPrice } = useFormatPrice();
  return (
    <div
      className={`${styles['minicartSummary__item']} velez-common-minicartSummary-summaryItem`}
    >
      <p
        className={`${styles['item__name']} velez-common-minicartSummary-summaryItem-name`}
      >
        {TranslateNamesTotalizer(id)}
      </p>
      <div className="velez-common-minicartSummary-summaryItem-containerValues">
        <span
          className={`${styles['item__value']}  ${
            styles[`item__value--${id}`]
          } velez-common-minicartSummary-summaryItem-containerValues-value`}
        >
          {formatPrice(value ? value / 100 : value)}
        </span>
        {showInstallments && installments && (
          <SummaryInstallments installmentOptions={installments} />
        )}
      </div>
    </div>
  );
};
