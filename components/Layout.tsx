import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden ${className}`}>
      {children}
    </div>
  );
};
