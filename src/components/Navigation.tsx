import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import UxAuditRequest from './UxAuditRequest';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About UX', path: '/about' },
    { name: 'UX Audits', path: '/audits' },
    { name: 'UX Complaint Box', path: '/ux-complaint-box' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuditModal = () => {
    setIsAuditModalOpen(true);
  };

  return (
    <>
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
            </nav>

            {/* Apply button */}
            <div className="hidden md:block">
              <button onClick={openAuditModal} className="btn-primary">
                Apply for Audit
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
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
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white fixed top-20 left-0 right-0 z-40 shadow-md">
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
            <button 
              onClick={() => {
                openAuditModal();
                setIsMenuOpen(false);
              }}
              className="block btn-primary text-center mt-4 w-full"
            >
              Apply for Audit
            </button>
          </div>
        </div>
      )}

      {/* UxAuditRequest Modal */}
      <UxAuditRequest 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />
    </>
  );
};

export default Navigation;
