import { useEffect, useState } from 'react';
import { useRuntime } from 'vtex.render-runtime';

const usePfpFixed = (): boolean => {
  const [isVisible, setIsVisible] = useState(false);
  const { route } = useRuntime();

  useEffect(() => {
    const handleVisibilityChange = (event: CustomEvent) => {
      setIsVisible(event.detail.isVisible);
    };

    window?.addEventListener(
      'visibilityChange',
      handleVisibilityChange as EventListener,
    );

    return () =>
      window?.removeEventListener(
        'visibilityChange',
        handleVisibilityChange as EventListener,
      );
  }, []);

  return route?.id === 'store.product' ? !isVisible : false;
};

export default usePfpFixed;
