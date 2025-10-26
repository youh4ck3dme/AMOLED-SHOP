import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './contexts/ThemeContext';
import Notification from './components/ui/Notification';
import QuickViewModal from './components/ui/QuickViewModal';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 transition-colors duration-300">
          <Notification />
          <QuickViewModal />
          <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
