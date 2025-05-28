import React from 'react';

interface SkeletonProps {
  type: 'title' | 'text' | 'image' | 'project' | 'avatar' | 'projectDetail';
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
            className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700"
          >
            <div className="aspect-video bg-dark-700 shimmer" />
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-6 bg-dark-700 rounded-md shimmer w-2/3" />
                <div className="h-5 bg-dark-700 rounded-full shimmer w-16" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-dark-700 rounded-md shimmer w-full" />
                <div className="h-4 bg-dark-700 rounded-md shimmer w-5/6" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-dark-700 rounded-md shimmer" />
                ))}
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-8 w-24 bg-dark-700 rounded-lg shimmer" />
                <div className="h-8 w-8 bg-dark-700 rounded-lg shimmer" />
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
      case 'projectDetail':
        return (
          <div key={index} className="space-y-8">
            <div className="aspect-video bg-dark-700 rounded-xl shimmer" />
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-8 bg-dark-700 rounded-md shimmer w-64" />
                  <div className="h-5 bg-dark-700 rounded-md shimmer w-48" />
                </div>
                <div className="h-10 w-32 bg-dark-700 rounded-lg shimmer" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-dark-700 rounded-md shimmer w-full" />
                <div className="h-4 bg-dark-700 rounded-md shimmer w-5/6" />
                <div className="h-4 bg-dark-700 rounded-md shimmer w-4/6" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-dark-700 rounded-lg shimmer" />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 w-24 bg-dark-700 rounded-full shimmer" />
                ))}
              </div>
            </div>
          </div>
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