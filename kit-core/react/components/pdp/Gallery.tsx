import React, { useMemo, useState } from 'react';

import { useProduct } from 'vtex.product-context';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import SwiperClass, {
  FreeMode,
  Navigation,
  // Pagination,
  Scrollbar,
  Thumbs,
  // Zoom,
  Mousewheel,
} from 'swiper';
import { useCssHandles } from 'vtex.css-handles';

import '../style/swiper.css';

export interface ProductImages {
  imageConfig: SwiperProps;
}

const CSS_HANDLES = [
  'containerProductImage',
  'thumbsProductImage',
  'listProductImage',
  'swiperThumbsProductImage',
  'swiperListProductImage',
  'slideProductImage',
  'productImage',
] as const;

const ProductGallery = () => {
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

  // eslint-disable-next-line no-console
  //   console.log('prueba images 3', images);

  //   return <></>;

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <div className={`w-100 flex flex-row ${handles.containerProductImage}`}>
      <div className={`flex items-center ${handles.thumbsProductImage}`}>
        <Swiper
          // loop={true}
          spaceBetween={0}
          freeMode={true}
          slidesPerView={4}
          direction={'vertical'}
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Navigation, Thumbs]}
          className={handles.swiperThumbsProductImage}
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
    </div>
  );
};

export default ProductGallery;
