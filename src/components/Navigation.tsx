
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About UX', path: '/about' },
    { name: 'UX Audits', path: '/audits' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-polkadot-pink rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <span className="font-bold text-xl">UX Bounty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-polkadot-pink'
                    : 'text-gray-600 hover:text-polkadot-pink'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://polkadot.network/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-gray-600 hover:text-polkadot-pink transition-colors"
            >
              Polkadot.network
            </a>
          </nav>

          {/* Apply button */}
          <div className="hidden md:block">
            <a href="#get-involved" className="btn-primary">
              Apply for Audit
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-polkadot-pink focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block font-medium py-2 ${
                  isActive(link.path)
                    ? 'text-polkadot-pink'
                    : 'text-gray-600 hover:text-polkadot-pink'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://polkadot.network/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block font-medium py-2 text-gray-600 hover:text-polkadot-pink"
              onClick={() => setIsMenuOpen(false)}
            >
              Polkadot.network
            </a>
            <a 
              href="#get-involved" 
              className="block btn-primary text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Apply for Audit
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
