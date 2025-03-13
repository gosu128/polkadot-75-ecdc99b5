import Header from '@/components/Header';

const CaseStudies = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex flex-col items-center space-y-16 py-[200px]">
        
        {/* First Slide Deck */}
        <div className="relative w-full max-w-[900px]">
          <div className="relative w-full" style={{ paddingTop: "60.3%" }}>  
            <iframe 
              src="https://docs.google.com/presentation/d/1JhftKc5G9VVjvD59tOk06SzMxB5FQclGu4P1i-tQ_gg/embed?start=false&loop=false&delayms=3000" 
              className="absolute top-0 left-0 w-full h-full border-0" 
              frameBorder="0" 
              allowFullScreen 
            />
          </div>
        </div>

        {/* Second Slide Deck */}
        <div className="relative w-full max-w-[900px]">
          <div className="relative w-full" style={{ paddingTop: "60.3%" }}>  
            <iframe 
  src="https://docs.google.com/presentation/d/1n5gn_0_LyxJKXHN8X9_K2euMnyD9ecF67Pta9OVF39A/embed?start=false&loop=false&delayms=3000" 
  className="absolute top-0 left-0 w-full h-full border-0" 
  frameBorder="0" 
  allowFullScreen 
/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CaseStudies;
