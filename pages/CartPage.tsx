import React from 'react';
import { useCartStore } from '../hooks/useCartStore';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '../hooks/useNotificationStore';

const CartPage: React.FC = () => {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const showNotification = useNotificationStore((state) => state.showNotification);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    showNotification('Checkout functionality is coming soon!', 'info');
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Cart</h1>
        {items.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-primary-green/30 rounded-lg">
            <FaShoppingCart className="mx-auto text-6xl text-primary-green/50 mb-4" />
            <p className="text-2xl font-semibold text-white">Your cart is currently empty.</p>
            <p className="text-md text-gray-400 mt-2">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="mt-6 inline-block bg-primary-green text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary-green/80 transition-all hover:shadow-neon-glow">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center p-4 bg-white dark:bg-black/50 rounded-lg shadow-md border border-primary-green/20"
                    >
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                      <div className="flex-grow">
                        <h2 className="font-semibold text-gray-800 dark:text-white">{item.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center mx-4">
                        <button onClick={() => decreaseQuantity(item.id)} className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500"><FaMinus /></button>
                        <span className="w-10 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-green"><FaPlus /></button>
                      </div>
                      <p className="w-24 text-right font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="ml-4 p-2 text-gray-500 dark:text-gray-400 hover:text-red-500"><FaTrash /></button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white/10 dark:bg-black/50 backdrop-blur-md rounded-lg shadow-md p-6 sticky top-24 border border-primary-green/30">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <hr className="my-4 border-gray-200 dark:border-primary-green/30" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary-green">${totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-primary-green text-black font-bold py-3 rounded-lg text-lg hover:bg-primary-green/80 transition-all hover:shadow-neon-glow"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default CartPage;