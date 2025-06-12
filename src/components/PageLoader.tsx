import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-20 h-20 relative">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-600 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-dark-100 font-medium">Loading...</p>
    </div>
  );
};

export default PageLoader;