
import { ArrowUpRight, Github, Twitter, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="about" className="bg-polkadot-black text-white pt-20 pb-8">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Logo and info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-polkadot-pink overflow-hidden flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
              <span className="ml-3 text-lg font-semibold">Polkadot</span>
            </div>
            <p className="text-white/70 mb-6">
              The next-generation platform for cross-chain applications and specialized blockchains.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter size={18} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github size={18} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Send size={18} className="text-white" />
              </a>
            </div>
          </div>
          
          {/* Navigation links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Ecosystem</h3>
            <ul className="space-y-4">
              {['Wiki', 'Parachains', 'XCM Format', 'Telemetry'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white inline-flex items-center transition-colors"
                  >
                    {item}
                    <ArrowUpRight size={14} className="ml-1 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Community</h3>
            <ul className="space-y-4">
              {['Blog', 'Events', 'Ambassadors', 'Treasury'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white inline-flex items-center transition-colors"
                  >
                    {item}
                    <ArrowUpRight size={14} className="ml-1 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Developers</h3>
            <ul className="space-y-4">
              {['Documentation', 'GitHub', 'Substrate', 'Stack Exchange'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white inline-flex items-center transition-colors"
                  >
                    {item}
                    <ArrowUpRight size={14} className="ml-1 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-white/10 pt-16 pb-10">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-2">Stay Updated</h3>
            <p className="text-white/70 text-center mb-6">
              Subscribe to our newsletter to receive product updates and Polkadot ecosystem insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="bg-white/10 text-white border-0 rounded-md px-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-polkadot-pink"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Polkadot. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
