/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from 'react';
import { useProduct } from 'vtex.product-context';
import { useCssHandles } from 'vtex.css-handles';
import styled from '../style/style.css';
import { useDevice } from 'vtex.device-detector';

const CSS_HANDLES = [
  'productSlideImages',
  'productSlideImgFirst',
  'productSlideImgButton',
  'productSlideImgContent',
  'productSlideImgContainer',
] as const;

const ProductImageSlider = () => {
  const [imageSelected, setImageSelected] = useState<number>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const { selectedItem }: any = useProduct();
  const { images: contextImages } = selectedItem;
  const { handles } = useCssHandles(CSS_HANDLES);

  const { isMobile } = useDevice();

  const imagesLength = useMemo(
    () => contextImages?.length || 0,
    [contextImages?.length],
  );

  const handleClick = useCallback(
    (
      event: React.MouseEvent | React.TouchEvent,
      direction: 'prev' | 'next',
    ) => {
      event.preventDefault();
      event.stopPropagation();

      setImageSelected((prev) => {
        if (direction === 'next') {
          return prev >= imagesLength - 1 ? 0 : prev + 1;
        } else {
          return prev <= 0 ? imagesLength - 1 : prev - 1;
        }
      });
    },
    [imagesLength],
  );

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    setTouchStart(event.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (!touchStart) return;

      const touchEnd = event.touches[0].clientX;
      const difference = touchStart - touchEnd;

      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          // Swipe left
          handleClick(event, 'next');
        } else {
          // Swipe right
          handleClick(event, 'prev');
        }
        setTouchStart(null); // Reset touchStart to prevent multiple triggers
      }
    },
    [touchStart, handleClick],
  );

  const renderedButtons = useMemo(() => {
    if (!(imagesLength > 1)) return null;
    return (
      <>
        <button
          aria-label="Anterior"
          className={`absolute bw0 pa0 pointer bg-transparent ${
            handles['productSlideImgButton']
          } ${styled['productSlideImg'] + 'Prev'}`}
          onClick={(event) => handleClick(event, 'prev')}
        />
        <button
          aria-label="Siguiente"
          className={`absolute bw0 pa0 pointer bg-transparent ${
            handles['productSlideImgButton']
          } ${styled['productSlideImg'] + 'Next'}`}
          onClick={(event) => handleClick(event, 'next')}
        />
      </>
    );
  }, [imagesLength, handles, handleClick]);

  const renderedImage = useMemo(() => {
    if (!contextImages) return null;
    return (
      <div className={`${handles.productSlideImgContent}`}>
        {!isMobile && (
          <img
            loading="lazy"
            src={contextImages[0]?.imageUrl}
            className={`${handles.productSlideImgFirst}`}
            alt={`${selectedItem?.nameComplete}-${imageSelected}`}
          />
        )}
        <img
          loading="lazy"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className={`${handles.productSlideImages}`}
          src={contextImages[imageSelected]?.imageUrl}
          alt={`${selectedItem?.nameComplete}-${imageSelected}`}
        />
      </div>
    );
  }, [
    isMobile,
    contextImages,
    imageSelected,
    handleTouchStart,
    handleTouchMove,
    handles.productSlideImages,
    selectedItem?.nameComplete,
    handles.productSlideImgFirst,
    handles.productSlideImgContent,
  ]);

  return (
    <div className={`${handles.productSlideImgContainer}`}>
      {!isMobile && renderedButtons}
      {renderedImage}
    </div>
  );
};

export default ProductImageSlider;
