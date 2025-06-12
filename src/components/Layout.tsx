import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <main className="flex-grow pb-16">
        {children}
      </main>
      
      {/* Fixed bottom navbar */}
      <Navbar />
    </div>
  );
};

export default Layout;