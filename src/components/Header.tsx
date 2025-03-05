
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container-tight flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-polkadot-pink overflow-hidden flex items-center justify-center animate-ping-slow">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <span className="ml-3 text-lg font-semibold">Polkadot Sales Hub</span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="nav-link">Features</a>
          <a href="#network" className="nav-link">Network</a>
          <a href="#community" className="nav-link">Community</a>
          <a href="#about" className="nav-link">About</a>
          <button className="btn-primary">Get Started</button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        'fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out pt-20',
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <nav className="flex flex-col items-center space-y-6 p-8">
          <a 
            href="#features" 
            className="text-xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#network" 
            className="text-xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Network
          </a>
          <a 
            href="#community" 
            className="text-xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Community
          </a>
          <a 
            href="#about" 
            className="text-xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <button 
            className="btn-primary w-full mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
