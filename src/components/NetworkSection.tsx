
import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

const NetworkSection = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    const options = {
      threshold: 0.2,
    };
    
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        
        const animateCount = (setter: React.Dispatch<React.SetStateAction<number>>, target: number, duration: number) => {
          const startTime = Date.now();
          const interval = 16; // ~60fps
          
          const timer = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeOutCubic(progress);
            
            setter(Math.floor(easedProgress * target));
            
            if (progress >= 1) {
              clearInterval(timer);
            }
          }, interval);
        };
        
        // Easing function
        const easeOutCubic = (x: number): number => {
          return 1 - Math.pow(1 - x, 3);
        };
        
        animateCount(setCount1, 550, 1500);
        animateCount(setCount2, 100, 1800);
        animateCount(setCount3, 250, 2000);
      }
    }, options);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="network" ref={sectionRef} className="section-spacing bg-white">
      <div className="container-tight">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="pill-tag mb-4 opacity-0 animate-fade-in">Network Highlights</div>
          <h2 className="heading-lg mb-6 opacity-0 animate-fade-in delay-100">
            <span className="text-polkadot-pink">Powering</span> the Future of Blockchain
          </h2>
          <p className="body-md opacity-0 animate-fade-in delay-200">
            Explore how Polkadot connects and secures a growing ecosystem of specialized blockchains called parachains.
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card-highlight text-center opacity-0 animate-fade-in delay-300">
            <h3 className="text-4xl md:text-5xl font-bold text-polkadot-pink mb-2">{count1}+</h3>
            <p className="text-foreground/70">Projects Building</p>
          </div>
          
          <div className="card-highlight text-center opacity-0 animate-fade-in delay-400">
            <h3 className="text-4xl md:text-5xl font-bold text-polkadot-pink mb-2">{count2}+</h3>
            <p className="text-foreground/70">Parachains Live</p>
          </div>
          
          <div className="card-highlight text-center opacity-0 animate-fade-in delay-500">
            <h3 className="text-4xl md:text-5xl font-bold text-polkadot-pink mb-2">{count3}K+</h3>
            <p className="text-foreground/70">Monthly Developers</p>
          </div>
        </div>
        
        {/* Network Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative order-2 lg:order-1 opacity-0 animate-fade-in delay-300">
            <div className="relative h-[400px] w-full rounded-xl bg-gradient-to-br from-polkadot-gray to-white overflow-hidden shadow-2xl">
              {/* Network visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Center hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-polkadot-pink rounded-full flex items-center justify-center z-10 animate-ping-slow">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-polkadot-pink rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Surrounding nodes */}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                    const angle = (i * Math.PI / 4);
                    const distance = 120;
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;
                    
                    return (
                      <div
                        key={i}
                        className="absolute w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center"
                        style={{
                          top: `calc(50% + ${y}px)`,
                          left: `calc(50% + ${x}px)`,
                          transform: 'translate(-50%, -50%)',
                          animation: `float ${3 + i % 3}s ease-in-out infinite`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      >
                        <div className="w-6 h-6 bg-polkadot-pink/20 rounded-full"></div>
                      </div>
                    );
                  })}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                      const angle = (i * Math.PI / 4);
                      const distance = 120;
                      const x = Math.cos(angle) * distance;
                      const y = Math.sin(angle) * distance;
                      
                      return (
                        <line
                          key={i}
                          x1="50%"
                          y1="50%"
                          x2={`calc(50% + ${x}px)`}
                          y2={`calc(50% + ${y}px)`}
                          stroke="rgba(230, 0, 122, 0.3)"
                          strokeWidth="2"
                          strokeDasharray="5 5"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
              
              {/* Decorative dots */}
              <div className="absolute inset-0">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-polkadot-pink/20 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.6 + 0.2
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="order-1 lg:order-2 opacity-0 animate-slide-up delay-400">
            <h3 className="heading-md mb-6">Network Benefits</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Cross-Chain Messaging",
                  description: "Transfer any type of data or asset between parachains securely and efficiently."
                },
                {
                  title: "Shared Security",
                  description: "All parachains benefit from the security of the Polkadot relay chain, eliminating the need to establish independent validator networks."
                },
                {
                  title: "On-Chain Governance",
                  description: "Token holders have control over the protocol, with all privileges granted to stakeholders through on-chain voting."
                }
              ].map((benefit, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-polkadot-pink/10 flex items-center justify-center mt-1">
                    <Check size={14} className="text-polkadot-pink" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium mb-1">{benefit.title}</h4>
                    <p className="text-foreground/70">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="btn-primary mt-8">Explore Ecosystem</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;
