import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1025);

  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth < 1025;
      setIsMobile((prev) => {
        if (prev !== isCurrentlyMobile) {
          return isCurrentlyMobile;
        }
        return prev;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};

export default useIsMobile;
