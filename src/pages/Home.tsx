import { ChevronDown, ArrowRight, Activity, Layers, Workflow, Copy } from 'lucide-react';
import DotPattern from '../components/DotPattern';
import polkadotFunded from '../assets/polkadot-funded.png';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <DotPattern />
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl opacity-0 animate-fade-in">
              We measure. We report. You implement.
              <span className="block polkadot-gradient font-bold">Your users win.</span>
            </h1>
            <img 
                src={polkadotFunded} 
                alt="Funded by polkadot" 
                className="w-[200px] mx-auto my-2 shadow-lg rounded-lg border border-gray-100 bg-background"
              />
            <p className="text-lg sm:text-xl text-gray-600 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              UX Bounty produces systematic solutions to enhance the user experience across the Polkadot ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <a href="#get-involved" className="btn-primary">
                Apply for a UX Audit
              </a>
              <a href="/about" className="btn-secondary">
                Learn About UX
              </a>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in" style={{ animationDelay: '1000ms' }}>
            <span className="text-sm text-gray-500 mb-2">Scroll to learn more</span>
            <ChevronDown className="w-6 h-6 text-polkadot-pink animate-float" />
          </div>
        </div>
      </section>

      {/* What We Produce Section */}
      <section className="py-16 bg-polkadot-light relative">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg">UX Bounty produces:</h2>
            <div className="w-20 h-1 bg-polkadot-pink mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card opacity-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 bg-polkadot-pink bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-polkadot-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Better products</h3>
              <p className="text-gray-600">
                Through rigorous audits, detailed reports, and actionable solutions that prioritize user experience.
              </p>
            </div>

            <div className="card opacity-0 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-12 h-12 bg-polkadot-pink bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <Copy className="w-6 h-6 text-polkadot-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Open-sourced library</h3>
              <p className="text-gray-600">
                A collection of patterns and best practices that you can plug & play into your products for immediate improvement.
              </p>
            </div>

            <div className="card opacity-0 animate-slide-up" style={{ animationDelay: '600ms' }}>
              <div className="w-12 h-12 bg-polkadot-pink bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-polkadot-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Unified experiences</h3>
              <p className="text-gray-600">
                Creating cohesive user journeys across the entire Polkadot ecosystem for better retention and adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Making Polkadot Section */}
      <section className="py-16 relative">
        <DotPattern />
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-16">Making Polkadot:</h2>

            <div className="space-y-10">
              <div className="flex flex-col md:flex-row items-center gap-6 opacity-0 animate-slide-up">
                <div className="w-16 h-16 bg-polkadot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">S</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Systematized</h3>
                  <p className="text-gray-600">
                    Creating a structured framework for user experience that can be consistently applied across all products.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 opacity-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 bg-polkadot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">C</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Consistent</h3>
                  <p className="text-gray-600">
                    Ensuring that users encounter familiar patterns and interactions regardless of which product they're using.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 opacity-0 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="w-16 h-16 bg-polkadot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">N</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Normalized</h3>
                  <p className="text-gray-600">
                    Standardizing interfaces and interactions to make them more intuitive and accessible to users of all levels.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 opacity-0 animate-slide-up" style={{ animationDelay: '600ms' }}>
                <div className="w-16 h-16 bg-polkadot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">U</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Unified</h3>
                  <p className="text-gray-600">
                    Bringing together disparate products into a cohesive ecosystem that feels like parts of a greater whole.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <a href="/about" className="inline-flex items-center text-polkadot-pink font-medium hover:underline">
                Learn more about our approach
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-involved" className="py-16 bg-polkadot-dark text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-8">Ready to improve your product?</h2>
            <p className="text-lg text-gray-300 mb-10">
              Apply for a free UX audit today and start providing a better experience for your users.
            </p>
            <a href="/audits" className="btn-primary bg-white text-polkadot-dark hover:bg-gray-100">
              Get Started with a UX Audit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
