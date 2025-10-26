import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import { useCartStore } from '../hooks/useCartStore';
import AnimatedPage from '../components/AnimatedPage';
import { FaCartPlus, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '../hooks/useNotificationStore';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const showNotification = useNotificationStore((state) => state.showNotification);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundProduct = products.find((p) => p.id === Number(productId));
      setProduct(foundProduct || null);
      setIsLoading(false);
    }, 500);
  }, [productId]);

  const handleAddToCart = () => {
    if (!product || isAdded) return;
    addToCart(product);
    showNotification(`${product.name} added to cart!`);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-96"></div>
          <div>
            <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="h-12 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="h-14 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-2xl font-bold">Product not found.</h2>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{product.name}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">{product.category}</p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{product.description}</p>
            <p className="text-5xl font-bold text-primary-green mb-6">${product.price.toFixed(2)}</p>
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className="w-full sm:w-auto flex items-center justify-center bg-primary-green text-black font-bold py-4 px-8 rounded-lg text-lg hover:bg-primary-green/80 transition-all transform hover:scale-105 hover:shadow-neon-glow disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isAdded ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-center"
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
                    className="flex items-center justify-center"
                  >
                    <FaCartPlus className="mr-3" />
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProductPage;
