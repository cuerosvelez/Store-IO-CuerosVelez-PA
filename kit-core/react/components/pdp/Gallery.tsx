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
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  const { isMobile } = useDevice();
  const { handles } = useCssHandles(CSS_HANDLES);
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
          observer={true}
          spaceBetween={0}
          mousewheel={isMobile}
          pagination={isMobile}
          observeParents={true}
          navigation={!isMobile}
          allowTouchMove={isMobile}
          onSwiper={setThumbsSwiper}
          observeSlideChildren={true}
          className={handles.swiperThumbsProductImage}
          modules={[Navigation, Thumbs, Pagination]}
          breakpoints={{
            1026: {
              slidesPerView: 4,
              direction: 'vertical',
              watchSlidesProgress: true,
            },
            0: {
              slidesPerView: 1,
              direction: 'horizontal',
            },
          }}
        >
          {images.map(({ imageText, imageUrl, imageLabel }, index) => (
            <SwiperSlide
              className={`${handles.slideProductImage}`}
              key={`thumbs-${imageText}-${index}`}
            >
              <img
                loading="lazy"
                src={imageUrl}
                alt={imageLabel}
                className={`${handles.productImage}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {!isMobile && (
        <div className={`${handles.listProductImage}`}>
          <Swiper
            freeMode={true}
            mousewheel={{
              forceToAxis: true,
            }}
            direction={'vertical'}
            slidesPerView={'auto'}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Scrollbar, Mousewheel, Thumbs]}
            className={handles.swiperListProductImage}
          >
            {images.map(({ imageText, imageUrl, imageLabel }, index) => (
              <SwiperSlide
                key={`product-${imageText}-${index}`}
                className={`${handles.slideProductImage}`}
              >
                <img
                  src={imageUrl}
                  alt={imageLabel}
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
