import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaStore } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useCartStore } from '../../hooks/useCartStore';
import { motion, useAnimation } from 'framer-motion';
import { ProductCategory } from '../../types';

const Header: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartControls = useAnimation();
  const prevTotalItemsRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof prevTotalItemsRef.current === 'number' && totalItems > prevTotalItemsRef.current) {
        cartControls.start({
            scale: [1, 1.3, 1],
            rotate: [0, -15, 15, -15, 0],
            transition: { duration: 0.5, type: 'spring', stiffness: 500, damping: 15 }
        });
    }
    prevTotalItemsRef.current = totalItems;
  }, [totalItems, cartControls]);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative transition-colors duration-200 ${
      isActive ? 'text-primary-green' : 'hover:text-primary-green'
    }`;
  
  const categories = Object.values(ProductCategory);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
        ? 'bg-white/70 dark:bg-black/70 backdrop-blur-lg shadow-md border-primary-green/30' 
        : 'bg-white dark:bg-black border-transparent'
      }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white">
              <FaStore className="text-primary-green" />
              <span>AMOLED</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            {categories.map(cat => (
              <NavLink key={cat} to={`/category/${encodeURIComponent(cat)}`} className={navLinkClasses}>
                {cat}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.div animate={cartControls}>
              <Link to="/cart" className="relative text-gray-500 dark:text-gray-400 hover:text-primary-green transition-colors">
                <FaShoppingCart size={24} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;