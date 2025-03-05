import { ArrowUpRight, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1E2E] text-white pt-16 pb-8">
      <div className="container-tight">
        
        {/* Flex container for Links, Resources, and Community */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
          {/* Logo and info */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-4">
              <span className="text-lg font-unbounded text-polkadot-pink">So So Scaled!</span>
            </div>
            <p className="text-white/70 text-sm mb-4">
              A one-stop resource hub for Polkadot BD Agents to find the tools and materials needed 
              to pitch to B2B customers in an effective and efficient way. 🚀
            </p>
          </div>

          {/* Links, Resources, and Community side-by-side */}
          <div className="flex flex-wrap md:flex-nowrap gap-12 w-full md:w-2/3 justify-between">
            {/* Links */}
            <div>
              <h3 className="text-base font-semibold mb-4">Links</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">About So So Scaled!</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-base font-semibold mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Project Background</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Whitepaper</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Methodology</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-base font-semibold mb-4">Community</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Follow us on X</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} So So Scaled. All rights reserved. Powered by 
            <a href="#" className="text-polkadot-pink hover:underline"> So So Scaled!</a>
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Twitter className="w-4 h-4 mr-1" /> X
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Github className="w-4 h-4 mr-1" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
