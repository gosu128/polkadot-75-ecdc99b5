
import { ArrowUpRight, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1E2E] text-white pt-16 pb-8">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Logo and info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-lg font-unbounded text-polkadot-pink">Polkadot</span>
              <span className="text-lg font-unbounded"> Sales Hub</span>
            </div>
            <p className="text-white/70 text-sm mb-4">
              A resource hub for Polkadot BD Agents to find the tools and materials needed to pitch to B2B customers in an effective and efficient way.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Links</h3>
            <ul className="space-y-3 text-sm">
              {['Home', 'Features', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white flex items-center transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              {['Documentation', 'Whitepaper', 'Roadmap'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white flex items-center transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Community</h3>
            <ul className="space-y-3 text-sm">
              {['hello@polkadot.network', 'Join our Discord', 'Follow us on Twitter'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white flex items-center transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} So So Scaled. All rights reserved. Powered by <a href="#" className="text-polkadot-pink hover:underline">So So Scaled!</a>
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Discord
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
