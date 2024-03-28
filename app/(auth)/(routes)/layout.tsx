import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='flex justify-center items-center h-full'>{children}</div>
  );
}

export default AuthLayout;
