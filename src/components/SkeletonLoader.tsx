import React from 'react';

interface SkeletonProps {
  type: 'title' | 'text' | 'image' | 'project' | 'avatar';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ type, count = 1 }) => {
  const getSkeletonByType = (type: string, index: number) => {
    switch (type) {
      case 'title':
        return (
          <div 
            key={index} 
            className="h-8 bg-dark-700 rounded-md shimmer w-2/3 mb-4"
          />
        );
      case 'text':
        return (
          <div key={index} className="space-y-2 mb-4">
            <div className="h-4 bg-dark-700 rounded-md shimmer w-full" />
            <div className="h-4 bg-dark-700 rounded-md shimmer w-5/6" />
            <div className="h-4 bg-dark-700 rounded-md shimmer w-4/6" />
          </div>
        );
      case 'image':
        return (
          <div 
            key={index} 
            className="aspect-video bg-dark-700 rounded-lg shimmer w-full mb-4" 
          />
        );
      case 'project':
        return (
          <div 
            key={index} 
            className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700 shimmer"
          >
            <div className="aspect-video bg-dark-700" />
            <div className="p-4 space-y-3">
              <div className="h-6 bg-dark-700 rounded-md w-3/4" />
              <div className="h-4 bg-dark-700 rounded-md w-full" />
              <div className="h-4 bg-dark-700 rounded-md w-5/6" />
              <div className="flex space-x-2 pt-2">
                <div className="h-6 w-16 bg-dark-700 rounded-full" />
                <div className="h-6 w-16 bg-dark-700 rounded-full" />
              </div>
            </div>
          </div>
        );
      case 'avatar':
        return (
          <div 
            key={index} 
            className="w-32 h-32 bg-dark-700 rounded-full shimmer mx-auto mb-4" 
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => getSkeletonByType(type, index))}
    </>
  );
};

export default SkeletonLoader;