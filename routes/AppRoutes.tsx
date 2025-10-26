
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import CategoryPage from '../pages/CategoryPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import { AnimatePresence } from 'framer-motion';

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
