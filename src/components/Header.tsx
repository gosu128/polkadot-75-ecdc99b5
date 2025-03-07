import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pb-4 bg-white shadow-md">
      <div className="container-tight flex flex-col items-center">
        
        {/* Centered Title */}
        <a href="/" className="flex items-center space-x-1">
          <span className="text-lg font-unbounded text-polkadot-pink">Polkadot</span>
          <span className="text-lg font-unbounded">Sales Hub</span>
        </a>

        {/* Navigation Bar Below Title */}
        <nav className="mt-3 flex space-x-6">
          <a href="/methodology" className="text-gray-700 hover:text-polkadot-pink font-medium transition">
            Methodology
          </a>
          <a href="/pmf-scores" className="text-gray-700 hover:text-polkadot-pink font-medium transition">
            PMF-Scores
          </a>
          <a href="/whitepaper" className="text-gray-700 hover:text-polkadot-pink font-medium transition">
            Whitepaper
          </a>
          <a href="/project-background" className="text-gray-700 hover:text-polkadot-pink font-medium transition">
            Project Background
          </a>
        </nav>

      </div>
    </header>
  );
};

export default Header;
