
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Resources = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex flex-col items-center space-y-36 py-[200px]">
        
        {/* BD Teams Content (First) */}
        <section id="bd-teams" className="w-full">
          <h2 className="text-2xl font-bold mb-8 text-center">BD Teams</h2>
          <div className="relative w-full max-w-[900px] mx-auto">
            <div className="relative w-full" style={{ paddingTop: "60.3%" }}>  
              <iframe
                src="https://docs.google.com/presentation/d/1z13q5HFfK39eZVtA6sdHk8jC-EmTQdnBnIjsW0Acyfk/embed?start=false&loop=false&delayms=3000"
                className="absolute top-0 left-0 w-full h-full border-0"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </section>
        
        {/* Case Studies Content (Second) */}
        <section id="case-studies" className="w-full">
          <h2 className="text-2xl font-bold mb-8 text-center">Case Studies</h2>
          
          {/* First Slide Deck */}
          <div className="relative w-full max-w-[900px] mx-auto mb-16">
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
          <div className="relative w-full max-w-[900px] mx-auto">
            <div className="relative w-full" style={{ paddingTop: "60.3%" }}>  
              <iframe 
                src="https://docs.google.com/presentation/d/1n5gn_0_LyxJKXHN8X9_K2euMnyD9ecF67Pta9OVF39A/embed?start=false&loop=false&delayms=3000" 
                className="absolute top-0 left-0 w-full h-full border-0" 
                frameBorder="0" 
                allowFullScreen 
              />
            </div>
          </div>
        </section>
        
        {/* Methodology Content (Third) */}
        <section id="methodology" className="w-full">
          <h2 className="text-2xl font-bold mb-8 text-center">Methodology</h2>
          <div className="relative w-full max-w-[900px] mx-auto">
            <div className="relative w-full" style={{ paddingTop: "60.3%" }}>  
              <iframe
                src="https://docs.google.com/presentation/d/1_ZD9gZb7flXCKxO_3t4R0HIm1TdjCHltD1hvtU_2z0M/embed?start=true&loop=false&delayms=3000"
                className="absolute top-0 left-0 w-full h-full border-0"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
