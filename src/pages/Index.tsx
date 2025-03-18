
import { useState } from 'react';
import Header from '@/components/Header';
import SalesDropdown from '@/components/SalesDropdown';
import Footer from '@/components/Footer';
import SegmentProfile from '@/components/SegmentProfile';

const Index = () => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const handleSelectSegment = (segment, industry) => {
    setSelectedSegment(segment);
    setSelectedIndustry(industry);
  };

  const handleResetSelection = () => {
    setSelectedSegment(null);
    setSelectedIndustry(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex flex-col justify-center items-center text-center px-6 min-h-screen">
        
        {/* Only show these elements when no segment is selected */}
        {!selectedSegment && (
          <>
            {/* Main Hero Content - Only visible on main page */}
            <section className="w-full max-w-4xl flex flex-col items-center justify-center h-full">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-unbounded font-bold mb-12 leading-tight">
                Who do you want to <br />
                pitch <span className="bg-clip-text text-transparent bg-gradient-to-r from-polkadot-pink via-[#9B87F5] to-[#7E69AB]">Polkadot</span> to?
              </h1>
              <SalesDropdown onSelectSegment={handleSelectSegment} />
            </section>
          </>
        )}

        {/* Show segment profile when a segment is selected */}
        {selectedSegment && (
          <div className="w-full">
            <SegmentProfile 
              segment={selectedSegment} 
              industry={selectedIndustry} 
              onBack={handleResetSelection} 
            />
          </div>
        )}
      </main>

      {/* Footer - Now only visible when scrolling */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
