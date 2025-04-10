import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

// Add type definition for the Tally global object
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

const UxComplaintBox = () => {
  useEffect(() => {
    // Load Tally script when component mounts
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Tally after script loads
    script.onload = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };

    return () => {
      // Clean up script when component unmounts
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-unbounded font-bold mb-6 text-polkadot-dark">
            UX <span className="text-polkadot-pink">Complaint</span> Box
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Found something frustrating in the Polkadot ecosystem? Tell us about your UX pain points 
            and help us make the experience better for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="flex justify-center lg:col-span-2">
            <img 
              src="/lovable-uploads/Referenda.png" 
              alt="UX Complaint Box" 
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md h-full lg:col-span-3">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-6 w-6 text-polkadot-pink mr-2" />
              <h2 className="text-2xl font-semibold">Submit Your Complaint</h2>
            </div>

            {/* Tally Form Embed */}
            <div className="w-full h-[calc(100vh-300px)] bg-white rounded-md overflow-hidden">
              <iframe 
                data-tally-src="https://tally.so/r/w4Gr6b?alignLeft=1&hideTitle=1&transparentBackground=1" 
                className="w-full h-full"
                frameBorder="0" 
                title="UX Complaint Form"
                style={{
                  border: 'none',
                  background: 'transparent'
                }}
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Why Your Feedback Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-polkadot-pink">Identify Pain Points</h3>
              <p className="text-gray-600">Your complaints help us discover where users are struggling the most.</p>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-polkadot-pink">Prioritize Improvements</h3>
              <p className="text-gray-600">We use your feedback to decide which UX issues to tackle first.</p>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-polkadot-pink">Build Better Products</h3>
              <p className="text-gray-600">Your insights drive our mission to create more intuitive experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UxComplaintBox;
