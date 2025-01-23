import React from 'react';
// import { FormattedPrice } from 'vtex.formatted-price';

import styles from './styles.css';

type SummaryInstallmentsProps = {
  installmentOptions: InstallmentOptionsProps[];
};

export type InstallmentOptionsProps = {
  installments: InstallmentProps[];
};

export type InstallmentProps = {
  count: number;
  hasInterestRate: boolean;
  total: number;
  value: number;
};

export const SummaryInstallments = ({
  installmentOptions,
}: SummaryInstallmentsProps) => {
  let maxInstallments: InstallmentOptionsProps | undefined;

  installmentOptions.forEach((option) => {
    const currentValueIsEmpty =
      !maxInstallments || Object.keys(maxInstallments).length === 0;

    if (
      currentValueIsEmpty ||
      option.installments.length > (maxInstallments?.installments.length ?? 0)
    ) {
      maxInstallments = option;
    }
  });

  if (!maxInstallments) {
    return <></>;
  }

  const maxInstallment: InstallmentProps =
    maxInstallments?.installments[maxInstallments?.installments.length - 1];

  maxInstallment;

  // const { count, value } = maxInstallment;

  return (
    <div
      className={`${styles['minicartSummary__installments']} velez-common-minicartSummary-summaryItem-installments`}
    >
      <p
        className={`${styles['installments__text']} velez-common-minicartSummary-summaryItem-installments-text`}
      >
        <span
          className={`${styles['installments__label']} velez-common-minicartSummary-summaryItem-installments-text-label`}
        >
          {/* ou em {count}x de */}
        </span>
        {/* <FormattedPrice value={value ? value / 100 : value} /> */}
      </p>
    </div>
  );
};
