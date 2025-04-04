
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-polkadot-light px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-polkadot-pink rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-10 h-10 bg-white rounded-full"></div>
        </div>
        <h1 className="heading-xl mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
