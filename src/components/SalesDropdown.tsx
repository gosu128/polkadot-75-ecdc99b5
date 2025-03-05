
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type DropdownOption = {
  title: string;
  description: string;
  link: string;
};

const SalesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const salesOptions: DropdownOption[] = [
    {
      title: "Enterprise Solutions",
      description: "Scale your business with our enterprise-grade blockchain infrastructure",
      link: "#enterprise"
    },
    {
      title: "Developer Tools",
      description: "Access comprehensive tools and resources for building on Polkadot",
      link: "#developer"
    },
    {
      title: "Parachain Launch",
      description: "Launch your own blockchain with shared security and interoperability",
      link: "#parachain"
    },
    {
      title: "Investment Opportunities",
      description: "Explore opportunities to invest in the future of Web3",
      link: "#investment"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-20 max-w-2xl mx-auto w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white shadow-lg rounded-xl px-6 py-4 flex items-center justify-between hover:shadow-xl transition-shadow duration-300"
      >
        <span className="text-xl font-unbounded font-medium">Explore Sales Solutions</span>
        {isOpen ? <ChevronUp className="text-polkadot-pink" /> : <ChevronDown className="text-polkadot-pink" />}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {salesOptions.map((option, index) => (
              <a 
                key={index} 
                href={option.link}
                className="p-4 rounded-lg hover:bg-polkadot-gray transition-colors duration-200"
              >
                <h3 className="text-lg font-medium mb-1">{option.title}</h3>
                <p className="text-sm text-foreground/70">{option.description}</p>
              </a>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <a href="#contact" className="text-polkadot-pink hover:text-polkadot-pink-light font-medium">
              Contact our sales team
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesDropdown;
