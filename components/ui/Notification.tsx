import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useNotificationStore } from '../../hooks/useNotificationStore';

const icons = {
  success: <FaCheckCircle className="text-primary-green" size={24} />,
  error: <FaExclamationCircle className="text-red-500" size={24} />,
  info: <FaInfoCircle className="text-blue-500" size={24} />,
};

const Notification: React.FC = () => {
  const { isVisible, message, type, hideNotification } = useNotificationStore();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed top-5 right-5 z-[100] w-full max-w-sm p-4 bg-black/80 backdrop-blur-md border border-primary-green/50 rounded-lg shadow-neon-glow"
          role="alert"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">{icons[type]}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-white">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={hideNotification}
                className="inline-flex text-gray-400 hover:text-white focus:outline-none"
                aria-label="Close"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
