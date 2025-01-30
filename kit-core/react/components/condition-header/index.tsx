/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRuntime } from 'vtex.render-runtime';
import { useProduct } from 'vtex.product-context';

interface PropsConditionHeader {
  Flyup?: React.ComponentType;
  Default?: React.ComponentType;
  children?: React.ReactNode;
}
const ConditionHeader = ({
  Flyup,
  Default,
  children,
}: PropsConditionHeader) => {
  const { route, page } = useRuntime();
  const { product }: any = useProduct();

  if (
    Flyup &&
    (route?.canonicalPath?.startsWith('/flyup') ||
      (page === 'store.product' && product?.brand?.toLowerCase() === 'flyup'))
  ) {
    return <Flyup>{children}</Flyup>;
  }

  if (Default) return <Default>{children}</Default>;

  return <></>;
};

export default ConditionHeader;
