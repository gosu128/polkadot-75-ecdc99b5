
import { useEffect, useRef } from 'react';
import SalesDropdown from './SalesDropdown';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const circles = heroRef.current.querySelectorAll('.floating-circle');
      
      circles.forEach((circle, index) => {
        const factor = index * 0.1 + 0.2;
        const element = circle as HTMLElement;
        element.style.transform = `translate(${x * factor * 100}px, ${y * factor * 100}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-polkadot-pink/10 floating-circle transition-transform duration-300 ease-out"></div>
        <div className="absolute top-1/4 -right-12 w-64 h-64 rounded-full bg-polkadot-pink/5 floating-circle transition-transform duration-300 ease-out"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-polkadot-pink/10 floating-circle transition-transform duration-300 ease-out"></div>
        <div className="absolute -bottom-20 right-1/3 w-56 h-56 rounded-full bg-polkadot-pink/5 floating-circle transition-transform duration-300 ease-out"></div>
      </div>
      
      {/* Hero content */}
      <div className="container-tight relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="pill-tag mb-6 opacity-0 animate-fade-in">
            The Interoperable Blockchain
          </div>
          
          <h1 className="heading-xl font-unbounded mb-6 opacity-0 animate-fade-in delay-200">
            Build<span className="bg-gradient-pink-orange text-transparent bg-clip-text"> Web3 </span>
            with <span className="bg-gradient-blue-purple text-transparent bg-clip-text">Infinite</span> Possibilities
          </h1>
          
          <p className="body-lg max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in delay-300">
            The multichain vision for Web3 starts here. Connect to multiple blockchains in a single network, share <span className="bg-gradient-green-teal text-transparent bg-clip-text font-medium">security</span>, and transfer any type of <span className="bg-gradient-pink-orange text-transparent bg-clip-text font-medium">data</span> or <span className="bg-gradient-blue-purple text-transparent bg-clip-text font-medium">asset</span> between chains.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in delay-400 mb-12">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
          
          {/* Sales Dropdown - Heart of the website */}
          <div className="w-full opacity-0 animate-fade-in delay-500">
            <SalesDropdown />
          </div>
        </div>
        
        {/* Animated dots grid */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-0 animate-fade-in-slow delay-700">
          <div className="w-full h-full max-w-3xl max-h-3xl grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
            {Array.from({ length: 400 }).map((_, i) => (
              <div
                key={i}
                className={`
                  w-1 h-1 bg-polkadot-pink rounded-full mx-auto my-auto
                  ${Math.random() > 0.8 ? 'opacity-60' : 'opacity-20'}
                  ${Math.random() > 0.92 ? 'animate-ping-slow' : ''}
                `}
                style={{
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in delay-1000">
        <span className="text-sm text-foreground/60 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-float"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
