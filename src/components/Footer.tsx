
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
                <li>
                  <Dialog>
                    <DialogTrigger className="text-white/70 hover:text-white transition-colors">
                      About So So Scaled!
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Coming soon...</DialogTitle>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-base font-semibold mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a 
                    href="https://polkadot.polkassembly.io/referenda/1090" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/70 hover:text-white transition-colors flex items-center"
                  >
                    Project Background
                    <ArrowUpRight className="ml-1 w-3 h-3" />
                  </a>
                </li>
                <li>
                  <Dialog>
                    <DialogTrigger className="text-white/70 hover:text-white transition-colors">
                      Whitepaper
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Coming soon...</DialogTitle>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </li>
                <li>
                  <a 
                    href="https://docs.google.com/presentation/d/1_ZD9gZb7flXCKxO_3t4R0HIm1TdjCHltD1hvtU_2z0M/present" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/70 hover:text-white transition-colors flex items-center"
                  >
                    Methodology
                    <ArrowUpRight className="ml-1 w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-base font-semibold mb-4">Community</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a 
                    href="https://x.com/sososcaled" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/70 hover:text-white transition-colors flex items-center"
                  >
                    Follow us on X
                    <ArrowUpRight className="ml-1 w-3 h-3" />
                  </a>
                </li>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
