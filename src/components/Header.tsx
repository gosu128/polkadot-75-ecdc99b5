
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pb-4">
      <div className="container-tight">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <span className="text-lg font-unbounded text-polkadot-pink">Polkadot</span>
            <span className="text-lg font-unbounded"> Sales Hub</span>
          </a>
          <a href="#" className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-6 py-2 rounded-full transition-colors">
            FAQ
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
