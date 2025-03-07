
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<number | null>(null);
  
  // Navigation items
  const navItems = [
    { name: "Case Studies", link: "/case-studies" },
    { name: "PMF-Scores", link: "/PMFScores" },
    { name: "Methodology", link: "/methodology" },
    { name: "Whitepaper", link: "/whitepaper" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pb-4 bg-white/90 backdrop-blur-sm">
      <div className="container-tight flex flex-col items-center">
        
        {/* Centered Title - Larger Size */}
        <a href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-unbounded text-polkadot-pink font-bold">Polkadot</span>
          <span className="text-2xl font-unbounded font-bold">Sales Hub</span>
        </a>

        {/* Navigation Bar Below Title */}
        <nav className="mt-3 flex space-x-3">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.link;
            
            return (
              <a
                key={index}
                href={item.link}
                className={cn(
                  "relative px-4 py-1.5 rounded-full text-sm font-medium font-unbounded transition-all duration-300 ease-in-out",
                  isActive 
                    ? "text-white bg-gradient-to-r from-polkadot-pink to-polkadot-pink-light shadow-sm" 
                    : "text-gray-700 hover:text-polkadot-pink"
                )}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <span className="relative z-10">{item.name}</span>
                {!isActive && isHovered === index && (
                  <span className="absolute inset-0 bg-white/80 rounded-full shadow-sm animate-fade-in-slow" />
                )}
              </a>
            );
          })}
        </nav>

      </div>
    </header>
  );
};

export default Header;
