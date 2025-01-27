import React, { useState, useEffect, useRef } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { useDevice } from 'vtex.device-detector';

import type { ReactChildren } from 'react';

import styled from '../style/style.css';

const CSS_HANDLES = ['scrollUpView', 'containerScrollUpView'] as const;

interface scrollProps {
  children?: ReactChildren;
  isMobile?: boolean;
  isDesktop?: boolean;
}
const ScrollUpView = ({
  children,
  isMobile: conditionMobile = true,
  isDesktop: conditionDesktop = true,
}: scrollProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const Ref = useRef<HTMLDivElement>(null);

  const { handles } = useCssHandles(CSS_HANDLES);

  const { isMobile } = useDevice();

  useEffect(() => {
    const element = Ref.current;
    const handleScroll = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if the element is visible in the viewport
      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollEvent = new CustomEvent('visibilityChange', {
      detail: { isVisible },
    });
    window.dispatchEvent(scrollEvent);
  }, [isVisible]);

  if ((isMobile && !conditionMobile) || (!isMobile && !conditionDesktop))
    return <></>;

  return (
    <div
      ref={Ref}
      className={`${handles.containerScrollUpView} ${
        isVisible
          ? styled['scrollUpView-'] + 'visible'
          : styled['scrollUpView-'] + 'hidden'
      }`}
    >
      <div className={`${handles.scrollUpView}`}>{children}</div>
    </div>
  );
};

ScrollUpView.schema = {
  title: 'Scroll Up View',
  type: 'object',
  properties: {
    isMobile: {
      title: 'Is Active Mobile?',
      type: 'boolean',
      default: 'false',
    },
    isDesktop: {
      title: 'Is Active Desktop?',
      type: 'boolean',
      default: 'false',
    },
  },
};

export default ScrollUpView;
