import React, { ReactNode, useMemo } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { useProduct } from 'vtex.product-context';

const CSS_HANDLES = ['productCluster'];
const ProductCluster = ({
  idCluster,
  children,
}: {
  idCluster?: string;
  children: ReactNode;
}) => {
  const { product } = useProduct() || {};
  const { handles } = useCssHandles(CSS_HANDLES);

  const hasTargetId = useMemo(
    () =>
      product?.productClusters?.some(
        (cluster: { id: string | undefined }) => cluster?.id === idCluster,
      ),
    [idCluster, product?.productClusters],
  );

  if (!children || !hasTargetId) return <></>;

  return <div className={`w-100 ${handles.productCluster}`}>{children}</div>;
};

export default ProductCluster;
