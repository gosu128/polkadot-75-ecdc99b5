
import { useState } from 'react';
import { ArrowRight, Zap, Shield, Network, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: <Zap size={24} className="text-polkadot-pink" />,
      title: "Scalable",
      description: "Polkadot can process many transactions in parallel, enabling high throughput and scalability that bridges can't achieve."
    },
    {
      icon: <Shield size={24} className="text-polkadot-pink" />,
      title: "Secure",
      description: "Polkadot provides shared security for all parachains in the network, ensuring high-level protection against attacks."
    },
    {
      icon: <Network size={24} className="text-polkadot-pink" />,
      title: "Interoperable",
      description: "Polkadot enables cross-blockchain transfers of any data or asset, not just tokens, opening possibilities for new applications."
    },
    {
      icon: <Layers size={24} className="text-polkadot-pink" />,
      title: "Flexible",
      description: "Polkadot allows each parachain to optimize for specific use cases, creating a more specific design than other networks."
    }
  ];

  return (
    <section id="features" className="section-spacing bg-polkadot-light">
      <div className="container-tight">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="pill-tag mb-4 opacity-0 animate-fade-in">Core Features</div>
          <h2 className="heading-lg font-unbounded mb-6 opacity-0 animate-fade-in delay-100">
            Built for Developers, <span className="bg-gradient-pink-orange text-transparent bg-clip-text">by Developers</span>
          </h2>
          <p className="body-md opacity-0 animate-fade-in delay-200">
            Polkadot provides the technical advancements necessary to make blockchain technology practical, accessible, <span className="bg-gradient-blue-purple text-transparent bg-clip-text font-medium">scalable</span>, and future-proof.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature tabs */}
          <div className="space-y-4 opacity-0 animate-slide-right delay-300">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "p-6 rounded-xl transition-all duration-300 cursor-pointer",
                  activeFeature === index 
                    ? "bg-white shadow-xl shadow-black/5"
                    : "hover:bg-white/50"
                )}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-center mb-2">
                  {feature.icon}
                  <h3 className="text-xl font-unbounded ml-3">{feature.title}</h3>
                  {activeFeature === index && (
                    <ArrowRight size={16} className="ml-auto text-polkadot-pink" />
                  )}
                </div>
                <p className="text-foreground/70 pl-9">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Feature illustration */}
          <div className="relative flex justify-center opacity-0 animate-fade-in delay-500">
            <div className="relative w-full max-w-md aspect-square">
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-polkadot-pink rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              
              {/* Orbiting dots */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="absolute w-6 h-6 bg-polkadot-pink/20 rounded-full"
                  style={{
                    top: `${50 + 40 * Math.sin(i * Math.PI / 3)}%`,
                    left: `${50 + 40 * Math.cos(i * Math.PI / 3)}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-full bg-polkadot-pink/30"
                    style={{
                      animationDelay: `${i * 0.2 + 0.1}s`,
                      animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                    }}
                  ></div>
                </div>
              ))}
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line 
                    key={i}
                    x1="50%" 
                    y1="50%" 
                    x2={`${50 + 40 * Math.cos(i * Math.PI / 3)}%`}
                    y2={`${50 + 40 * Math.sin(i * Math.PI / 3)}%`}
                    stroke="rgba(230, 0, 122, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
