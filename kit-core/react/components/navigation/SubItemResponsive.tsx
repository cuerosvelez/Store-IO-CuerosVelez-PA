import React from 'react';
import { Link } from 'vtex.render-runtime';

import type { ReactNode } from 'react';

interface SubItemResponsiveProps {
  href?: string | null;
  classes: string;
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubItemResponsive = ({
  href,
  classes,
  children,
  onClick,
}: SubItemResponsiveProps) => {
  return href ? (
    <Link to={href.toLowerCase()} className={classes}>
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`w0 pa0 pointer bn bg-transparent ${classes}`}
    >
      {children}
    </button>
  );
};

export default SubItemResponsive;
