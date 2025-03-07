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
        <nav className="mt-4 flex space-x-4">
          {[
            { name: "Methodology", link: "/methodology" },
            { name: "PMF-Scores", link: "/pmf-scores" },
            { name: "Whitepaper", link: "/whitepaper" },
            { name: "Project Background", link: "/project-background" }
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="relative px-5 py-2 rounded-full text-gray-700 bg-gray-100 font-medium transition-all duration-300 hover:bg-polkadot-pink hover:text-white"
            >
              {item.name}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-polkadot-pink scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default Header;

