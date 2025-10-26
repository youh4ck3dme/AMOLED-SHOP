
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-primary-green/30">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} AMOLED E-shop. All Rights Reserved.</p>
        <p className="mt-2 text-sm">
          Built with React, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
