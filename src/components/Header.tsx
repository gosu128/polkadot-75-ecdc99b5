
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Navigation items
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Segment Profiles", link: "/segments" },
    { name: "Segment Ratings", link: "/pmf-scores" },
    { name: "Case Studies", link: "/case-studies" },
    { name: "BD Teams", link: "/bd-teams" },
    { name: "Methodology", link: "/methodology" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pb-4 bg-white/90 backdrop-blur-sm">
      <div className="container-tight flex flex-col items-center">
        {/* Navigation Bar - No Title */}
        <nav className="flex space-x-3">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.link;
            return (
              <a 
                key={index} 
                href={item.link} 
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium font-unbounded transition-all duration-300 ease-in-out",
                  isActive
                    ? "font-bold bg-gradient-to-r from-[#7E22CE] via-[#E6007A] to-[#F43F5E] bg-clip-text text-transparent"
                    : "text-gray-700 hover:text-polkadot-pink"
                )}
                onMouseEnter={() => setIsHovered(index)} 
                onMouseLeave={() => setIsHovered(null)}
                style={isActive ? { WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}}
              >
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
