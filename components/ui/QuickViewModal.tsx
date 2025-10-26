import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCartPlus, FaCheck } from 'react-icons/fa';
import { useQuickViewStore } from '../../hooks/useQuickViewStore';
import { useCartStore } from '../../hooks/useCartStore';
import { useNotificationStore } from '../../hooks/useNotificationStore';

const QuickViewModal: React.FC = () => {
  const { isOpen, product, closeModal } = useQuickViewStore();
  const { addToCart } = useCartStore();
  const { showNotification } = useNotificationStore();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Reset isAdded state when modal opens with a new product
    if (isOpen) {
      setIsAdded(false);
    }
  }, [isOpen, product]);

  const handleAddToCart = () => {
    if (!product || isAdded) return;
    addToCart(product);
    showNotification(`${product.name} added to cart!`);
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
        closeModal();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="relative w-full max-w-4xl m-4 bg-black border-2 border-primary-green/50 rounded-lg shadow-neon-glow-strong overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <FaTimes size={24} />
            </button>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="p-4 md:p-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="p-6 pt-12 md:pt-6">
                <h1 className="text-3xl font-extrabold text-white mb-2">{product.name}</h1>
                <p className="text-lg text-gray-400 mb-4">{product.category}</p>
                <p className="text-gray-300 leading-relaxed mb-6 h-32 overflow-y-auto">
                  {product.description}
                </p>
                <p className="text-5xl font-bold text-primary-green mb-6">${product.price.toFixed(2)}</p>
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="w-full sm:w-auto flex items-center justify-center bg-primary-green text-black font-bold py-4 px-8 rounded-lg text-lg hover:bg-primary-green/80 transition-all transform hover:scale-105 hover:shadow-neon-glow disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isAdded ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center"
                      >
                        <FaCheck className="mr-3" />
                        Added!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <FaCartPlus className="mr-3" />
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
