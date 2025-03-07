import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pb-4 bg-white shadow-md">
      <div className="container-tight flex flex-col items-center">
        
        {/* Centered Title - Larger Size */}
        <a href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-unbounded text-polkadot-pink font-bold">Polkadot</span>
          <span className="text-2xl font-unbounded font-bold">Sales Hub</span>
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
              className="relative px-5 py-2 rounded-full text-gray-700 bg-gray-100 font-unbounded transition-all duration-300 ease-in-out 
              hover:text-white hover:bg-gradient-to-r from-[#E6007A] via-[#7E69AB] to-[#4F46E5] shadow-lg"
            >
              {item.name}
            </a>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default Header;


export default Header;

