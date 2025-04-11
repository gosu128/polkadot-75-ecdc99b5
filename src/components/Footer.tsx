
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-polkadot-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-polkadot-pink rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="font-bold text-lg">UX Bounty</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Improving the Polkadot ecosystem through systematic, consistent, and normalized user experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/Polkadot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="https://github.com/polkadot-js" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                GitHub
              </a>
              <a href="https://polkadot.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                Polkadot
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">About UX</a>
              </li>
              <li>
                <a href="/audits" className="text-gray-300 hover:text-white transition-colors">UX Audits</a>
              </li>
            </ul>
          </div>
          
          
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} UX Bounty. All rights reserved.
          </p>
          <div className="flex space-x-6">
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
