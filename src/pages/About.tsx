
import { ArrowRight, ExternalLink } from 'lucide-react';
import DotPattern from '../components/DotPattern';

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 relative">
        <DotPattern />
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="heading-xl text-center mb-8 opacity-0 animate-fade-in">
              About <span className="polkadot-gradient">UX</span>
            </h1>
            <div className="text-center mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="inline-block bg-polkadot-pink text-white px-4 py-2 rounded-full font-bold text-lg">
                Breaking the myth: UX != UI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is UX Section */}
      <section className="py-16 bg-polkadot-light">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="opacity-0 animate-slide-up">
                <h2 className="heading-lg mb-6">What is UX?</h2>
                <p className="text-gray-600 mb-6">
                  UX (User Experience) is a structured discipline that blends research, engineering principles, and design to create products that truly serve users' needs.
                </p>
                <p className="text-gray-600">
                  It goes beyond aesthetics to focus on functionality, accessibility, and the emotional response users have when interacting with a product.
                </p>
              </div>

              <div className="relative opacity-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="bg-white rounded-xl shadow-xl p-8 relative z-10">
                  <div className="w-16 h-16 bg-polkadot-pink bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-polkadot-pink font-bold text-xl">UX</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">UX is systematic and data-driven</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-polkadot-pink rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      <span>Research-based user insights</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-polkadot-pink rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      <span>Usability principles & standards</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-polkadot-pink rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      <span>Interaction design & architecture</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-polkadot-pink rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      <span>Accessibility considerations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-polkadot-pink rounded-full flex-shrink-0 mt-1 mr-3"></div>
                      <span>Iterative testing & optimization</span>
                    </li>
                  </ul>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-polkadot-pink opacity-5 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-polkadot-purple opacity-5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UX Principles Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg text-center mb-16">UX Core Principles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card opacity-0 animate-slide-up">
                <div className="w-12 h-12 bg-polkadot-pink bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-polkadot-pink font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Structured Discipline</h3>
                <p className="text-gray-600">
                  UX is a structured discipline that blends research, engineering principles, and design to create meaningful experiences.
                </p>
              </div>

              <div className="card opacity-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="w-12 h-12 bg-polkadot-pink bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-polkadot-pink font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Research-Driven</h3>
                <p className="text-gray-600">
                  UX is more than just design—it's a structured, research-driven process that ensures usability and accessibility.
                </p>
              </div>

              <div className="card opacity-0 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="w-12 h-12 bg-polkadot-pink bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-polkadot-pink font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Data-Driven</h3>
                <p className="text-gray-600">
                  UX is systematic and data-driven, combining research, usability principles, and interaction design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Line Section */}
      <section className="py-16 bg-polkadot-dark text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-8">Bottom Line</h2>
            <p className="text-2xl font-semibold mb-10 opacity-0 animate-fade-in">
              If your UX work starts and ends in Figma, you are not doing UX.
            </p>
            <a href="/audits" className="btn-primary bg-white text-polkadot-dark hover:bg-gray-100 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Discover Our UX Audit Process
            </a>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg text-center mb-16">Learn More About UX</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href="https://www.nngroup.com/articles/definition-user-experience/" target="_blank" rel="noopener noreferrer" className="card flex flex-col h-full hover:border-polkadot-pink transition-colors group">
                <h3 className="text-xl font-semibold mb-4 group-hover:text-polkadot-pink transition-colors">Nielsen Norman Group on UX</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Learn about user experience from one of the most respected authorities in the field.
                </p>
                <div className="flex items-center text-polkadot-pink">
                  <span className="font-medium">Read article</span>
                  <ExternalLink className="ml-2 w-4 h-4" />
                </div>
              </a>

              <a href="https://www.interaction-design.org/literature/topics/ux-design" target="_blank" rel="noopener noreferrer" className="card flex flex-col h-full hover:border-polkadot-pink transition-colors group">
                <h3 className="text-xl font-semibold mb-4 group-hover:text-polkadot-pink transition-colors">Interaction Design Foundation</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  A comprehensive guide to understanding the principles and practices of UX design.
                </p>
                <div className="flex items-center text-polkadot-pink">
                  <span className="font-medium">Explore resources</span>
                  <ExternalLink className="ml-2 w-4 h-4" />
                </div>
              </a>
            </div>

            <div className="mt-16 text-center">
              <a href="/audits" className="inline-flex items-center text-polkadot-pink font-medium hover:underline">
                Ready to improve your product? Learn about our UX Audits
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
