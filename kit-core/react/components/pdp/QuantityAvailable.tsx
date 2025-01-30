/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProduct } from 'vtex.product-context';
import { index as RichText } from 'vtex.rich-text';
import React, { useMemo } from 'react';

import useIOMessage from '../hooks/ioMessage';

const QuantityAvailable = ({
  text = '{ quantity } Unidad disponible',
  textPlural = '{ quantity } Unidades disponibles',
}: {
  text?: string;
  textPlural?: string;
}) => {
  const { selectedItem }: any = useProduct();

  const quantity = useMemo(() => {
    const data =
      selectedItem?.sellers?.find(
        (item: { sellerDefault: boolean }) => item?.sellerDefault === true,
      )?.commertialOffer?.AvailableQuantity ?? 0;

    return data;
  }, [selectedItem?.sellers]);

  const label = useIOMessage({
    id: quantity > 1 ? textPlural : text,
    values: {
      quantity: quantity,
    },
  })?.message;

  if (quantity > 999) return <></>;

  return <RichText text={label} />;
};

QuantityAvailable.schema = {
  title: 'Quantity Available Group',
  type: 'object',
  properties: {
    text: {
      title: 'Quantity available text',
      type: 'string',
      default: '{ quantity } Unidad disponible',
    },
    textPlural: {
      title: 'Quantity available text in plural',
      type: 'string',
      default: '{ quantity } Unidades disponibles',
    },
  },
};

export default QuantityAvailable;
