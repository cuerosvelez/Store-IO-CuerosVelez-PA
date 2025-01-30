import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { index as RichText } from 'vtex.rich-text';
import styled from '../style/style.css';
const TextData = ({
  text,
  children,
}: {
  text?: string;
  children?: ReactNode;
}) => {
  const maxHeight = 100; // Altura máxima antes de truncar
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Verifica si el contenido es más alto que el límite
  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, [children]);

  if (!text) return <></>;

  return (
    <section className={`${styled['seoTexData']}`}>
      <div
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? 'none' : `${maxHeight}px`,
        }}
        className={`${styled['seoTexData'] + 'Content'}`}
      >
        <RichText text={text} />
      </div>
      {isOverflowing && (
        <button
          className={`relative bw0 pa0 db pointer bg-transparent ${
            styled['seoTexData'] + 'Button'
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </section>
  );
};

TextData.schema = {
  title: 'Text Data Seo',
  type: 'object',
  properties: {
    text: {
      title: 'Text',
      type: 'string',
      default: '',
      widget: {
        'ui:widget': 'textarea',
      },
    },
  },
};

export default TextData;
