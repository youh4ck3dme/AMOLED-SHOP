
import React from 'react';

const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-transparent dark:border-gray-800 animate-pulse">
    <div className="w-full h-64 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-4">
      <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-8 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  </div>
);

interface LoadingSkeletonProps {
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
