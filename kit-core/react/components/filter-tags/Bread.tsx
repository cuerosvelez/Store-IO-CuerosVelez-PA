import React, { useEffect, useRef } from 'react';
import { useFilterTagsContext } from './Context';

// import styled from './style.css';

const Bread = () => {
  const Ref = useRef<HTMLDivElement>(null);
  const { RefBread } = useFilterTagsContext();

  useEffect(() => {
    const divInsert = Ref.current;
    const bread = RefBread.current;
    if (bread && divInsert) {
      const observer = new MutationObserver(() => {
        const child = bread.firstElementChild;
        if (child && divInsert.innerHTML !== child.outerHTML) {
          divInsert.innerHTML = '';
          divInsert.appendChild(child.cloneNode(true));
        }
      });
      observer.observe(bread, {
        childList: true,
        subtree: false,
      });
      return () => observer.disconnect();
    }
    return;
  }, [RefBread]);

  return <div ref={Ref} className={'breadFilterTagsSectionsPLP'}></div>;
};

export default Bread;
