import { ArrowRight, CheckCircle, Users, FileSearch, FileText, Settings, Zap } from 'lucide-react';
import DotPattern from '../components/DotPattern';
import UxAuditRequest from '../components/UxAuditRequest';
import { useState } from 'react';

const Audits = () => {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 relative">
        <DotPattern />
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-8 opacity-0 animate-fade-in">
              <span className="polkadot-gradient">UX Audits</span> for Better Products
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Get a professional assessment of your product's user experience and actionable recommendations to improve it.
            </p>
            <button 
              onClick={() => setIsAuditModalOpen(true)}
              className="btn-primary opacity-0 animate-fade-in" 
              style={{ animationDelay: '400ms' }}
            >
              Request UX Audit
            </button>
          </div>
        </div>
      </section>

      {/* UxAuditRequest Modal */}
      <UxAuditRequest 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />

      {/* Ecosystem Diagram Section - New section with the image */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-10">UX Bounty in the Polkadot Ecosystem</h2>
            <div className="flex justify-center mb-10">
              <img 
                src="/public/lovable-uploads/diagram.png" 
                alt="Polkadot Ecosystem UX Audit Flow Diagram" 
                className="max-w-full md:max-w-2xl shadow-lg rounded-lg border border-gray-100"
              />
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The UX Bounty program audits user-facing products in the Polkadot ecosystem to improve the overall user experience across the network.
            </p>
          </div>
        </div>
      </section>

      {/* About UX Audits Section */}
      <section className="py-16 bg-polkadot-light">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="opacity-0 animate-slide-up">
                <h2 className="heading-lg mb-6">UX Audit Grants</h2>
                <p className="text-gray-600 mb-6">
                  The objective of the UX Audit grants is to provide a curated and standardised service to evaluate the user experience of products within the Polkadot ecosystem.
                </p>
                <p className="text-gray-600">
                  This assessment aims to identify usability issues, pain points, and areas for enhancement through a structured analysis of user interactions and feedback.
                </p>
              </div>

              <div className="relative opacity-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="bg-white rounded-xl shadow-xl p-8 relative z-10">
                  <h3 className="text-xl font-semibold mb-6 text-polkadot-pink">What You'll Get:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                      <span>Detailed usability assessment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                      <span>User testing results and analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                      <span>Prioritized list of issues to fix</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                      <span>Actionable recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                      <span>Implementation guidance</span>
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

      {/* Audit Process Section */}
      <section id="audit-process" className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg text-center mb-16">The UX Audit Process</h2>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-start gap-6 opacity-0 animate-slide-up">
                <div className="w-16 h-16 bg-polkadot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Settings className="w-5 h-5 text-polkadot-pink mr-2" />
                    <h3 className="text-2xl font-semibold">Qualification Check</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We check if your product qualifies—Is it live? Bug-free? Usable?
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Your product must be a live, functioning application</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Major bugs should be fixed before the audit</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Basic functionality should be in place</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-6 opacity-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 bg-polkadot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 text-polkadot-pink mr-2" />
                    <h3 className="text-2xl font-semibold">Consultation</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We talk. We define your biggest pain points and pick a narrow, testable scope.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Initial meeting to understand your product and goals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Identification of key user flows and pain points</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Agreement on specific scope for the audit</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-6 opacity-0 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="w-16 h-16 bg-polkadot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <FileSearch className="w-5 h-5 text-polkadot-pink mr-2" />
                    <h3 className="text-2xl font-semibold">User Testing</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We run user tests. We measure where users struggle, and we analyze the data.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Recruitment of relevant test participants</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Observation of users completing key tasks</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Collection of quantitative and qualitative data</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-6 opacity-0 animate-slide-up" style={{ animationDelay: '600ms' }}>
                <div className="w-16 h-16 bg-polkadot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <FileText className="w-5 h-5 text-polkadot-pink mr-2" />
                    <h3 className="text-2xl font-semibold">Report Delivery</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    You get a detailed report with actionable fixes.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Comprehensive documentation of findings</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Prioritized list of usability issues</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Specific recommendations for improvement</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-6 opacity-0 animate-slide-up" style={{ animationDelay: '800ms' }}>
                <div className="w-16 h-16 bg-polkadot-pink rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">5</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Zap className="w-5 h-5 text-polkadot-pink mr-2" />
                    <h3 className="text-2xl font-semibold">Implementation</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    You implement. Your product improves. Your users win.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Your team makes the recommended changes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>We offer support during implementation if needed</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-polkadot-pink rounded-full mt-2 mr-2"></div>
                      <span>Successful solutions are documented for the community</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library of Best Practices */}
      <section className="py-16 bg-polkadot-light">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-8">Public Library of Best Practices</h2>
            <p className="text-lg text-gray-600 mb-10">
              Successful UX solutions are documented in a public library of best practices that everyone in the Polkadot ecosystem can access and implement.
            </p>
            <div className="bg-white rounded-xl shadow-xl p-8 mb-10">
              <h3 className="text-xl font-semibold mb-6">The library includes:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                  <span>UI patterns that work</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                  <span>Interaction models</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                  <span>User flow examples</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                  <span>Code snippets</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                  <span>Case studies</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-polkadot-pink mt-1 mr-3 flex-shrink-0" />
                  <span>Research findings</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              Coming soon: Browse our growing library of UX patterns and best practices
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-polkadot-dark text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-8">Ready to Apply?</h2>
            <p className="text-lg text-gray-300 mb-10">
              Have a Polkadot-based product? Apply for a free UX audit today.
            </p>
            <a href="#" className="btn-primary bg-white text-polkadot-dark hover:bg-gray-100 inline-flex items-center">
              Apply for UX Audit
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Audits;
