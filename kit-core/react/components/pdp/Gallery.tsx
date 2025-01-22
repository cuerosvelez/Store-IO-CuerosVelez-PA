/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactChildren, useMemo, useState } from 'react';

import { useProduct } from 'vtex.product-context';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import SwiperClass, {
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
  // Zoom,
  Mousewheel,
} from 'swiper';
import { useCssHandles } from 'vtex.css-handles';

import '../style/swiper.css';
import { useDevice } from 'vtex.device-detector';

export interface ProductImages {
  imageConfig: SwiperProps;
}

const CSS_HANDLES = [
  'productImage',
  'listProductImage',
  'slideProductImage',
  'thumbsProductImage',
  'containerProductImage',
  'swiperListProductImage',
  'swiperThumbsProductImage',
  'thumbsProductImage-active',
  'containerProductImageFlyup',
] as const;

const ProductGallery = ({ children }: { children: ReactChildren }) => {
  const { selectedItem, skuSelector, product } = useProduct() || {};

  const images = useMemo(() => {
    let imagePaths;

    if (
      product &&
      product.items &&
      skuSelector &&
      skuSelector.selectedImageVariationSKU
    ) {
      const skuItem = product.items.find(
        (sku) => sku.itemId === skuSelector.selectedImageVariationSKU,
      );

      if (skuItem) {
        imagePaths = skuItem.images;
      }
    }

    if (!imagePaths && selectedItem) {
      imagePaths = selectedItem.images;
    }

    return (imagePaths || []).map(
      (image: { imageUrl: string; imageText: string; imageLabel: string }) => ({
        imageUrl: image.imageUrl,
        imageText: image.imageText,
        imageLabel: image.imageLabel,
      }),
    );
  }, [product, skuSelector, selectedItem]);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const { handles } = useCssHandles(CSS_HANDLES);

  const { isMobile } = useDevice();

  const swiperProps: any = useMemo(
    () => ({
      ...(!isMobile && {
        loop: true,
        navigation: true,
        slidesPerView: 4,
        direction: 'vertical',
        modules: [FreeMode, Navigation, Thumbs],
      }),
      ...(isMobile && {
        pagination: true,
        slidesPerView: 1,
        modules: [Pagination],
      }),
    }),
    [isMobile],
  );

  return (
    <div
      className={`flex flex-row ${handles.containerProductImage} ${
        product?.brand?.toLowerCase() === 'flyup'
          ? handles.containerProductImageFlyup
          : ''
      }`}
    >
      <div className={`flex items-center ${handles.thumbsProductImage}`}>
        <Swiper
          spaceBetween={0}
          onSwiper={setThumbsSwiper}
          className={handles.swiperThumbsProductImage}
          {...swiperProps}
        >
          {images.map(({ imageText, imageUrl, imageLabel }) => (
            <SwiperSlide
              className={`${handles.slideProductImage}`}
              key={imageText}
            >
              <img
                src={imageUrl}
                alt={imageLabel}
                // onMouseEnter={() => swiperRef.current?.zoom.in()}
                // onMouseDownCapture={() => swiperRef.current?.zoom.out()}
                loading="lazy"
                className={`${handles.productImage}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {!isMobile && (
        <div className={`${handles.listProductImage}`}>
          <Swiper
            // {...imageConfig}
            freeMode={true}
            mousewheel={true}
            direction={'vertical'}
            slidesPerView={'auto'}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Scrollbar, Mousewheel, Thumbs]}
            className={handles.swiperListProductImage}
          >
            {images.map(({ imageText, imageUrl, imageLabel }) => (
              <SwiperSlide
                key={imageText}
                className={`${handles.slideProductImage}`}
              >
                <img
                  src={imageUrl}
                  alt={imageLabel}
                  // onMouseEnter={() => swiperRef.current?.zoom.in()}
                  // onMouseDownCapture={() => swiperRef.current?.zoom.out()}
                  loading="lazy"
                  className={`${handles.productImage}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {children ?? <></>}
    </div>
  );
};

export default ProductGallery;
