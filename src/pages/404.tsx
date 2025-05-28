import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <PageTransition>
      <div className="section-container flex flex-col items-center justify-center text-center">
        <h1 className="text-8xl font-bold mb-4 gradient-text red-glow">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-dark-100 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </PageTransition>
  );
};

export default NotFound;