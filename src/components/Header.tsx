import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Navigation items
  const navItems = [
    { name: "Segment Profiles", link: "/" },
    { name: "Segment Rankings", link: "/pmf-scores" },
    { name: "Case Studies", link: "/case-studies" },
    { name: "BD Teams", link: "/bd-teams" },
    { name: "Methodology", link: "/methodology" }
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
                  "relative px-4 py-1.5 text-sm font-medium font-unbounded transition-all duration-300 ease-in-out",
                  isActive
                    ? "bg-clip-text text-transparent font-bold bg-gradient-to-r from-[#E6007A] via-[#9B87F5] to-[#2F80ED]" // Gradient text effect
                    : "text-gray-700 hover:text-polkadot-pink"
                )}
                onMouseEnter={() => setIsHovered(index)} 
                onMouseLeave={() => setIsHovered(null)}
              >
                <span className="relative z-10 font-normal px-0 mx-[10px]">{item.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;

