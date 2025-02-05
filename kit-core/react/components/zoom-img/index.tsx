import React, { useEffect } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { useState, useRef } from 'react';
import { useDevice } from 'vtex.device-detector';
import { createPortal } from 'react-dom';

interface ZoomImgProps {
  blockClass?: string;
  imageUrl: string;
  imageUrlMobile?: string;
}

const ZoomImg = ({ blockClass, imageUrl, imageUrlMobile }: ZoomImgProps) => {
  const CSS_HANDLES = [
    'modal_overlay_zoomImg',
    'modal_content_zoomImg',
    'image_with_zoom_zoomImg',
    'close_button_zoomImg',
    'container_image_zoom',
    'zoomed',
    'image_without_zoom_zoomImg',
  ];
  const handles = useCssHandles(CSS_HANDLES, { blockClass });

  const [componentDOM, setComponentDOM]: any = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageRef: any = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { isMobile } = useDevice();

  console.log('HANDLES: ', handles.handles.modal_overlay_zoomImg);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e: any) => {
    if (!isZoomed) return;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setPosition({ x, y });
  };

  const componentToRender = () => {
    return (
      <>
        <img
          src={isMobile && imageUrlMobile ? imageUrlMobile : imageUrl}
          alt=""
          onClick={handleOpenModal}
          className={`${handles.handles.image_with_zoom_zoomImg}`}
        />

        {isModalOpen &&
          createPortal(
            <div
              className={`${handles.handles.modal_overlay_zoomImg}`}
              onClick={handleCloseModal}
            >
              <div className={`${handles.handles.modal_content_zoomImg}`}>
                <button
                  className={`${handles.handles.close_button_zoomImg}`}
                  onClick={handleCloseModal}
                >
                  <img src="https://cuerosvelezco.vtexassets.com/assets/vtex.file-manager-graphql/images/6b28d9d7-155d-40e1-92eb-95a43687f69c___bdb914318b9cfe2c65246c2f13e4ee2a.png" />
                </button>
                <div
                  className={`${handles.handles.container_image_zoom}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    className={`${handles.handles.image_without_zoom_zoomImg} ${
                      isZoomed && !isMobile ? `${handles.handles.zoomed}` : ''
                    }`}
                    style={{
                      transformOrigin: `${position.x * 100}% ${
                        position.y * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>,
            componentDOM,
          )}
      </>
    );
  };

  useEffect(() => {
    const DOM: any = document.getElementById('id_galeria_landing');

    setComponentDOM(DOM);
  }, []);

  return <>{componentToRender()}</>;
};

ZoomImg.schema = {
  title: 'Zoom Image',
  type: 'object',
  properties: {
    imageUrl: {
      type: 'string',
      default: '',
      title: 'Image',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    imageUrlMobile: {
      type: 'string',
      default: '',
      title: 'Image Mobile',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
};

export default ZoomImg;
