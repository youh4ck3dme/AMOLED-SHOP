import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import AnimatedPage from '../components/AnimatedPage';
import { ProductCategory } from '../types';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const titleText = "Future of Shopping";
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 * i },
    }),
  };

  const letterVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-16 sm:py-24"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Experience the
            <motion.span 
              className="block text-primary-green"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              {titleText.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300">
            Discover a curated collection of high-tech gadgets, modern apparel, and unique home goods, all on a stunning AMOLED-friendly interface.
          </p>
          <div className="mt-8">
            <Link
              to={`/category/${ProductCategory.Electronics}`}
              className="inline-block bg-primary-green text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary-green/80 transition-all transform hover:scale-105 hover:shadow-neon-glow-strong animate-pulse-glow"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>

        {/* Featured Products Section */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Featured Products
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Home;