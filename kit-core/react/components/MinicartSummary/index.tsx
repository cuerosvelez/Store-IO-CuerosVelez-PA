import React from 'react';
import { useOrderForm } from 'vtex.order-manager/OrderForm';

import { SummaryItem } from './SummaryItem';
import type { InstallmentOptionsProps } from './SummaryInstallments';

import styles from './styles.css';

interface MinicartSummaryProps {
  /**
   * Define se o componente exibirá o valor do frete
   */
  showDeliveryTotal?: boolean;
  /**
   * Define se o componente exibirá o valor total
   */
  showTotal?: boolean;
  /**
   * Define se o componente exibirá o valor de cada parcela
   */
  showInstallments?: boolean;
}

type Totalizer = {
  id: string;
  name: string;
  value: number;
  __typename: string;
};

/**
 * Componente que exibe o resumo dos valores no minicart
 */
export const MinicartSummary = ({
  showDeliveryTotal = false,
  showTotal = true,
  showInstallments = false,
}: MinicartSummaryProps) => {
  const { orderForm } = useOrderForm();
  const { totalizers, value, paymentData } = orderForm;

  const installmentOptions =
    paymentData.installmentOptions as InstallmentOptionsProps[];

  const filteredTotalizers = !showDeliveryTotal
    ? totalizers.filter((totalizer: Totalizer) => totalizer.id !== 'Shipping')
    : totalizers;

  return (
    <div
      className={`${styles['minicartSummary__container']} velez-common-minicartSummary`}
    >
      <div
        className={`${styles['minicartSummary__hide']} velez-common-minicartSummary-hide`}
      >
        {filteredTotalizers.map((totalizer: Totalizer) => (
          <SummaryItem
            key={totalizer.id}
            id={totalizer.id}
            value={totalizer.value}
          />
        ))}
      </div>

      {showTotal && (
        <SummaryItem
          id="Total"
          value={value}
          showInstallments={showInstallments}
          installments={installmentOptions}
        />
      )}
    </div>
  );
};
