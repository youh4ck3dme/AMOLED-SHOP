import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCartPlus, FaCheck, FaEye } from 'react-icons/fa';
import { Product } from '../../types';
import { useCartStore } from '../../hooks/useCartStore';
import { useNotificationStore } from '../../hooks/useNotificationStore';
import { useQuickViewStore } from '../../hooks/useQuickViewStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const showNotification = useNotificationStore((state) => state.showNotification);
  const openModal = useQuickViewStore((state) => state.openModal);
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdded) return;

    addToCart(product);
    showNotification(`${product.name} added to cart!`);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuickView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(product);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-neon-glow-strong transition-all duration-300 border border-transparent dark:border-primary-green/30 dark:hover:border-primary-green"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center"
              >
                <button
                  onClick={handleQuickView}
                  className="flex items-center gap-2 bg-primary-green text-black font-bold py-2 px-4 rounded-lg hover:bg-primary-green/80 transition-all transform hover:scale-105"
                >
                  <FaEye />
                  Quick View
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
            {product.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {product.category}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold text-gray-900 dark:text-primary-green">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className="p-2 rounded-full bg-primary-green text-black hover:bg-primary-green/80 transition-colors duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
              aria-label={`Add ${product.name} to cart`}
            >
               <AnimatePresence mode="wait" initial={false}>
                {isAdded ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <FaCheck size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="cart"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -90 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <FaCartPlus size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;